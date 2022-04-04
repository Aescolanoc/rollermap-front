import { describe, it, expect, vi } from "vitest";
import { getUserId } from "../utils";

vi.mock("../../services/api", () => ({
  getUserId: vi.fn().mockReturnValue({}),
}));

describe("Utils function", () => {
  it("When function is called", () => {
    let result = getUserId();
    expect(getUserId).toHaveBeenCalled();
    expect(result).toEqual({});
  });
});
