import { defineStore } from "pinia";
import * as api from "../services/api";
import type User from "@/types/User";

export const useRollerMapStore = defineStore({
  id: "rollermap",
  state: () => ({
    user: {} as User,
    rollerPlaces: [],
  }),
  actions: {
    async login() {
      return await api.login({ email: "pepe@pepe.es", password: "1234" });
    },
  },
});
