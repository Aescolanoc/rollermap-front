import { describe, it, expect, vi } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/App.vue";

describe("App component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();
  const checkUser = vi.fn();

  it("renders properly", () => {
    checkUser.mockResolvedValue("1");
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });
    expect(wrapper).toBeTruthy();
    expect(checkUser).toHaveBeenCalled();
  });
});
