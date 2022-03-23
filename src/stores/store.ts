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
      try {
        const { data } = await api.login(user);
        this.user = data;
        localStorage.setItem("userToken", JSON.stringify(this.user.token));
        console.log(data);
      } catch (error) {
        return error;
      }
    },

    async register(user: object) {
      try {
        const { data } = await api.register(user);
        this.user = data;
      } catch (error) {
        return error;
      }
    },

    async getAllRollerPlaces() {
      try {
        const { data } = await api.getAllRollerPlaces();
        this.rollerPlaces = data;
      } catch (error) {
        return error;
      }
    },

    async toggleFavorites(placeId: string) {
      try {
        const { data } = await api.toggleFavorites(placeId);
        this.user = data;
      } catch (error) {
        return error;
      }
    },
  },
});
