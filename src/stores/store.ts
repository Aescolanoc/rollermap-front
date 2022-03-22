import { defineStore } from "pinia";
import * as api from "../services/api";
import type User from "@/types/User";
import type RollerPlace from "@/types/RollerPlace";

export const useRollerMapStore = defineStore({
  id: "rollermap",
  state: () => ({
    user: {} as User,
    rollerPlaces: [] as RollerPlace[],
  }),
  actions: {
    async login(user: object) {
      return await api.login(user);
    },
    async getAllRollerPlaces() {
      return await api.getAllRollerPlaces();
    },

    async toggleFavorites(placeId: any) {
      return await api.toggleFavorites(placeId);
    },
  },
});
