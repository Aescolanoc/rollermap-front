import { describe, it, expect, vi } from "vitest";
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
  const placeTypeMock = "rink";

  it("renders properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("filterChanged is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
    });
    vi.spyOn(wrapper.vm, "filterChanged");
    wrapper.vm.checkbox = true;
    wrapper.vm.filterChanged();
    expect(wrapper.vm.filterChanged).toHaveBeenCalled();
  });

  it("newPlaceClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
      props: { PlaceType: placeTypeMock },
    });
    vi.spyOn(wrapper.vm, "newPlaceClicked");
    wrapper.vm.myPlaces = false;
    wrapper.vm.newPlaceClicked();
    expect(wrapper.vm.newPlaceClicked).toHaveBeenCalled();
  });

  // it("has a 'create new' button", () => {
  //   const wrapper = mount(TestComponent, {
  //     global: {
  //       plugins: [vuetify, pinia],
  //       stubs: stubs,
  //     },
  //   });
  //   const element = wrapper.get(".v-btn.v-btn--elevated.v-btn--icon");
  //   expect(element.text()).toEqual("crear pista/ruta");
  // });
});
