import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/components/RollerPlacesList.vue";

describe("RollerPlaceList component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();
  const stubs = {
    MapboxMap: {
      template: "<div/>",
    },
    MapboxMarker: {
      template: "<div/>",
    },
  };

  it("renders properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("has a 'create new' button", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
    });
    const element = wrapper.get("button.v-btn.v-btn--elevated");
    expect(element.text()).toEqual("crear pista/ruta");
  });
});
