import { defineStore } from "pinia";
import * as api from "../services/api";
import type User from "@/types/User";
import type RollerPlace from "@/types/RollerPlace";
import router from "@/router/index";

export const useRollerMapStore = defineStore({
  id: "rollermap",
  state: () => ({
    user: {} as User,
    rollerPlaces: [] as RollerPlace[],
    userRollerPlaces: [] as RollerPlace[],
  }),

  actions: {
    userLogOut() {
      this.$reset();
      sessionStorage.removeItem("userToken");
      sessionStorage.removeItem("userId");
      router.push({ name: "login" });
    },

    async login(user: object) {
      try {
        const { data } = await api.login(user);
        sessionStorage.setItem("userToken", JSON.stringify(data.token));
        sessionStorage.setItem("userId", JSON.stringify(data._id));
        this.user = data;
        return this.user;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async register(user: object) {
      try {
        const { data } = await api.register(user);
        this.user = data;
        return data;
      } catch (error) {
        return error;
      }
    },

    async getUserDetails(userId: string) {
      try {
        const { data } = await api.getUserDetails(userId);
        this.user = data;
        return data;
      } catch (error) {
        return error;
      }
    },

    async updateUser(userId: string, user: object) {
      try {
        const { data } = await api.updateUser(userId, user);
        this.user = data;
        router.push({ name: "rollerplaces" });
      } catch (error) {
        return error;
      }
    },

    async getAllRollerPlaces() {
      try {
        const { data } = await api.getAllRollerPlaces();
        this.rollerPlaces = data;
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    async getMyRollerPlaces() {
      try {
        const { data } = await api.getMyRollerPlaces();
        this.userRollerPlaces = data;
        return data;
      } catch (error: any) {
        throw new Error(error.message);
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

    async createRollerPlace(place: object) {
      try {
        const { data } = await api.createRollerPlace(place);
        this.rollerPlaces = data;
        router.push({ name: "rollerplaces" });
      } catch (error) {
        return error;
      }
    },

    async updateRollerPlace(placeId: string, place: object) {
      try {
        const { data } = await api.updateRollerPlace(placeId, place);
        this.rollerPlaces = data;
        router.push({ name: "rollerplaces" });
      } catch (error) {
        return error;
      }
    },

    async deleteRollerPlace(placeId: string) {
      try {
        const { data } = await api.deleteRollerPlace(placeId);
        this.rollerPlaces = data;
        router.push({ name: "rollerplaces" });
      } catch (error) {
        return error;
      }
    },
  },
});
