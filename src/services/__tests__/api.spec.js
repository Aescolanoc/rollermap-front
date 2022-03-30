import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "../api";

// vi.mock("axios", () => ({
//   ...vi.requireActual("axios"),
//   post: vi.fn().mockResolvedValue({ data: "Mocked response" }),
// }));

vi.mock("axios", async () => ({
  ...(await vi.importActual, "axios"),
  post: vi.fn().mockResolvedValue({ data: "Mocked response" }),
}));

describe("Testing Api service", () => {
  describe("When function is called", () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: "Mocked response" });
      axios.patch.mockResolvedValue({ data: "Mocked response" });
      axios.post.mockResolvedValue({ data: "Mocked response" });
    });
    it("login", () => {
      expect(api.login({ email: "pepe@pepe.es", password: "1234" })).toEqual({ data: 3 });
    });
  });
});
