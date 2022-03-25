import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/components/UserForm.vue";

describe("UserForm component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();

  it("renders properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("A button is rendered", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });
    expect(wrapper.text()).toContain("Registro");
    // expect(wrapper.find("div")).toBeTruthy();
    // expect(wrapper.find("button")).toBeTruthy();
  });
});
