import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import * as api from "../api";

vi.mock("axios", () => ({
  default: {
    create: vi.fn().mockReturnValue({
      interceptors: {
        response: {
          use: vi.fn().mockImplementation((callback1, callback2) => callback1()),
        },
      },
      post: vi.fn(),
      get: vi.fn(),
    }),
  },
}));

describe("Testing Api service", () => {
  describe("When function is called", () => {
    it("login", () => {
      api.login({ email: "mail", password: "12345678" });
      expect(axios.create().post).toHaveBeenCalled();
    });
  });

  describe("When function is called", () => {
    it("register", () => {
      api.register({ email: "mail", password: "12345678" });
      expect(axios.create().post).toHaveBeenCalled();
    });
  });

  describe("When function is called", () => {
    it("register", () => {
      api.getUserDetails("1");
      expect(axios.create().get).toHaveBeenCalled();
    });
  });

  describe("When function is called", () => {
    it("getAllRollerPlaces", () => {
      api.getAllRollerPlaces();
      expect(axios.create().get).toHaveBeenCalled();
    });
  });
});
