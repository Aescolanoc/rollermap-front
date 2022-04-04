import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../../services/api";
import { setActivePinia, createPinia } from "pinia";
import { useRollerMapStore } from "../store";

vi.mock("../../services/api", () => ({
  userLogOut: vi.fn().mockReturnValue({}),
  login: vi.fn().mockReturnValue({ data: { token: "token", _id: "1" } }),
  register: vi.fn().mockResolvedValue({ data: { name: "Paco", _id: "1" } }),
  getUserDetails: vi.fn().mockResolvedValue({ data: { name: "Paco", _id: "1" } }),
  updateUser: vi.fn().mockResolvedValue({ data: { name: "Francisco" } }),
  getAllRollerPlaces: vi.fn().mockResolvedValue({ data: [{ name: "Madrid Rio" }, { name: "Retiro" }] }),
  getMyRollerPlaces: vi.fn().mockResolvedValue({ data: [{ name: "Madrid Rio" }] }),
  toggleFavorites: vi.fn().mockResolvedValue({}),
  createRollerPlace: vi.fn().mockResolvedValue({ data: { name: "Madrid Rio 2", _id: "11" } }),
  updateRollerPlace: vi.fn().mockResolvedValue({ data: { name: "Madrid Rio nuevo", _id: "11" } }),
  deleteRollerPlace: vi.fn().mockResolvedValue({}),
}));

describe("Testing Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("userLogOut", () => {
    const user = useRollerMapStore();
    user.userLogOut();

    expect(user.userLogOut).toHaveBeenCalled();
  });

  it("login", async () => {
    const user = useRollerMapStore();
    let result = await user.login({ email: "paco@paco.es", password: "1234" });

    expect(result).toEqual({ token: "token", _id: "1" });
  });

  it("register", async () => {
    const user = useRollerMapStore();
    let result = await user.register({ name: "Paco", email: "paco@paco.es", password: "1234" });

    expect(result).toEqual({ name: "Paco", _id: "1" });
  });

  it("getUserDetails", async () => {
    const user = useRollerMapStore();
    let result = await user.getUserDetails({ name: "Paco", email: "paco@paco.es", password: "1234" });

    expect(result).toEqual({ name: "Paco", _id: "1" });
  });

  it("updateUser", async () => {
    const user = useRollerMapStore();
    let result = await user.updateUser("1", { name: "Francisco" });

    expect(result).toEqual({ name: "Francisco" });
  });

  it("getAllRollerPlaces", async () => {
    const rollerPlaces = useRollerMapStore();
    let result = await rollerPlaces.getAllRollerPlaces();

    expect(result).toEqual([{ name: "Madrid Rio" }, { name: "Retiro" }]);
  });

  it("getMyRollerPlaces", async () => {
    const rollerPlaces = useRollerMapStore();
    let result = await rollerPlaces.getMyRollerPlaces();

    expect(result).toEqual([{ name: "Madrid Rio" }]);
  });

  it("toggleFavorites", async () => {
    const rollerPlaces = useRollerMapStore();
    await rollerPlaces.toggleFavorites("11");

    expect(rollerPlaces.toggleFavorites).toHaveBeenCalled();
  });

  it("createRollerPlace", async () => {
    const rollerPlaces = useRollerMapStore();
    let result = await rollerPlaces.createRollerPlace({ name: "Madrid Rio 2" });

    expect(result).toEqual({ name: "Madrid Rio 2", _id: "11" });
  });

  it("updateRollerPlace", async () => {
    const rollerPlaces = useRollerMapStore();
    let result = await rollerPlaces.updateRollerPlace("11", { name: "Madrid Rio 2" });

    expect(result).toEqual({ name: "Madrid Rio nuevo" });
  });

  it("deleteRollerPlace", async () => {
    const rollerPlaces = useRollerMapStore();
    await rollerPlaces.deleteRollerPlace("11");

    expect(rollerPlaces.deleteRollerPlace).toHaveBeenCalled();
  });
});
