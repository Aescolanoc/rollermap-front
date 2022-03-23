<template>
  <div>
    <register-user></register-user>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegisterUser from "../components/RegisterUser.vue";

export default defineComponent({
  components: {
    RegisterUser,
  },
});
</script>
