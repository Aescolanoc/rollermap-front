import { beforeAll } from "vitest";
global.CSS = { supports: () => false };

beforeAll(() => {
  global.CSS = {
    supports: (str) => false,
    escape: (str) => str,
  };
});
