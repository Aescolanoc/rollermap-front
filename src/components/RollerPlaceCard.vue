<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="roller-card" min-width="320" :elevation="isHovering ? 16 : 6" v-bind="props">
      <v-img :src="place.image" :alt="place.name" height="200px" cover>
        <v-expand-transition
          ><div v-if="isHovering" class="transition-fast-in-fast-out v-card--reveal bg-white" style="height: 100%">
            <mapbox-map
              :accessToken="mapboxToken"
              :center="place.location"
              :zoom="14.5"
              mapStyle="streets-v11"
              :interactive="false"
            >
              <mapbox-marker :lngLat="place.location" />
            </mapbox-map>
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-title class="name"> {{ place.name }} </v-card-title>

      <v-card-actions>
        <div v-if="!isGuest">
          <v-btn
            icon="mdi-heart"
            color="purple"
            class="roller-card_favorite-button elevation-1"
            v-if="isInFavorites"
            @click="favoriteClicked"
          >
          </v-btn>
          <v-btn
            icon="mdi-heart-outline"
            color="purple"
            class="roller-card_favorite-button elevation-1"
            v-else
            @click="favoriteClicked"
          >
          </v-btn>
        </div>

        <v-chip label :color="isRink ? 'cyan-darken-2' : 'red-darken-1'">
          <v-icon left icon="mdi-rollerblade"></v-icon>
          {{ isRink ? "Pista" : "Ruta" }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn color="purple-darken-3" variant="text" @click="detailsClicked"> Ver más </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent } from "vue";
import { mapBoxConfig } from "@/config";
import { PlaceType } from "@/helpers/rollerMapEnums";
import { guestUser } from "@/config";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  props: {
    place: {
      type: Object,
      required: true,
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

    isInFavorites() {
      return this.store?.user?.favorites?.includes(this.place._id);
    },
    isRink() {
      return this.place.type === PlaceType.RINK;
    },
  },
  data() {
    return {
      mapboxToken: mapBoxConfig.token,
      PlaceType,
    };
  },
  methods: {
    favoriteClicked() {
      let placeId = this.place._id;
      this.store.toggleFavorites(placeId);
    },
    detailsClicked() {
      this.$router.push({
        name: "details",
        params: { routeId: this.place._id },
      });
    },
  },
});
</script>

<style lang="scss">
.roller-card {
  margin-bottom: 24px;
  cursor: pointer;
}
.roller-card_favorite-button {
  position: absolute;
  bottom: 78px;
  right: 20px;
  background-color: white;
}
</style>
