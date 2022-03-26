<template>
  <div>
    <user-form :userId="userId"></user-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm from "../components/UserForm.vue";
import type { PropType } from "vue";

export default defineComponent({
  components: {
    UserForm,
  },
  props: {
    userId: {
      type: String as PropType<string>,
    },
  },
});
</script>
