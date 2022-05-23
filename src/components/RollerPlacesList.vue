<template>
  <v-row class="guest-banner-wrapper">
    <v-col cols="12" class="py-12">
      <div>
        <roller-filter @filtered="filterChanged"></roller-filter>
        <v-tooltip bottom v-if="!isGuest">
          <template v-slot:activator="{ props }">
            <v-btn icon color="deep-purple" class="button-create ml-8" v-bind="props" @click="newPlaceClicked()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Crear Pista/Ruta</span>
        </v-tooltip>
      </div>
      <div>
        <v-alert class="guest-banner" v-if="isGuest" border="top" color="primary">
          Regístrate para crear nuevos sitios
          <template v-slot:actions>
            <v-btn text color="deep-purple accent-4"> Registrarse </v-btn>
          </template>
        </v-alert>
      </div>
    </v-col>
  </v-row>

  <div v-if="filteredRollerPlaces.length" class="d-flex flex-wrap flex-column justify-space-around flex-sm-row">
    <div v-for="item in paginatedRollerPlaces" :key="item._id">
      <roller-place-card :place="item"></roller-place-card>
    </div>
  </div>
  <div v-else class="list-noplaces">
    <img class="List-noplaces__image" src="../assets/img/no_rollerplaces.png" alt="No hay pistas que mostrar" />
    <p class="text-disabled">No hay contenido para mostrar</p>
  </div>

  <div class="text-center">
    <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import RollerPlaceCard from "./RollerPlaceCard.vue";
import { defineComponent } from "vue";
import { PlaceType } from "@/helpers/rollerMapEnums";
import type RollerPlace from "@/types/RollerPlace";
import RollerFilter from "./RollerFilter.vue";
import { guestUser } from "@/config";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  components: {
    RollerPlaceCard,
    RollerFilter,
  },

  watch: {
    currentPage(): void {
      this.pageChanged();
    },
  },

  computed: {
    isGuest() {
      let userType = false;
      if (this.store.user._id === guestUser.id) {
        userType = true;
      }
      return userType;
    },
  },

  data() {
    return {
      currentPage: 1 as number,
      itemsInPage: 8 as number,
      totalPages: 1 as number,
      filter: PlaceType.ALL as PlaceType,
      filteredRollerPlaces: [] as RollerPlace[],
      paginatedRollerPlaces: [] as RollerPlace[],
      PlaceType,
    };
  },
  props: {
    myPlaces: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.filterChanged(PlaceType.ALL);
  },
  methods: {
    filterChanged(filter: PlaceType) {
      this.currentPage = 1;
      this.filter = filter;
      let places = this.myPlaces ? this.store.userRollerPlaces : this.store.rollerPlaces;

      if (filter === PlaceType.ALL) {
        this.filteredRollerPlaces = places;
      } else {
        this.filteredRollerPlaces = places.filter((item) => {
          return item.type === this.filter;
        });
      }
      this.getPaginatedItems();
    },

    pageChanged(): void {
      this.getPaginatedItems();
    },

    getPaginatedItems(): void {
      this.totalPages = Math.ceil(this.filteredRollerPlaces.length / this.itemsInPage);
      this.paginatedRollerPlaces = [];
      const startIndex = (this.currentPage - 1) * this.itemsInPage;
      const endIndex = startIndex + this.itemsInPage;
      for (let index = startIndex; index < endIndex; index++) {
        if (this.filteredRollerPlaces[index]) {
          this.paginatedRollerPlaces.push(this.filteredRollerPlaces[index]);
        }
      }
    },

    newPlaceClicked(): void {
      this.$router.push({
        name: "newrollerplace",
      });
    },
  },
});
</script>

<style lang="scss">
.guest-banner-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px, 0px;
  margin: 20px, 0px;
}

.guest-banner {
  margin-bottom: 10px;
  width: fit-content;
  text-align: right;
}

.list-noplaces {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  .List-noplaces__image {
    height: 300px;
    opacity: 0.3;
  }
}
</style>
