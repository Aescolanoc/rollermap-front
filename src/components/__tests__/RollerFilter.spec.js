import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/components/RollerFilter.vue";

describe("RollerFilter component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();

  const type = "rink";

  it("renders properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    expect(wrapper).toBeTruthy();
  });

  it("filterChanged function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
      props: { PlaceType: type },
    });
    wrapper.find("button").trigger("click");
    wrapper.vm.filter = "rink";
    expect(wrapper.emitted()).toHaveProperty("filtered");
  });
});
