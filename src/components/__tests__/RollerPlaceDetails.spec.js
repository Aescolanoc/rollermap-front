import { describe, it, expect, vi } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount, shallowMount } from "@vue/test-utils";
import TestComponent from "@/components/RollerPlaceDetails.vue";

describe("RollerPlaceDetails component", () => {
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

  const $store = {
    state: {
      user: {},
      rollerPlaces: [
        {
          _id: "622fb6522ce112a7ddb0c657",
          name: "Paseo de coches - Retiro",
          description: "Pista muy popular entre los rollers",
          location: [-3.68307, 40.41317],
          type: "pista",
          slalom: true,
          city: "Madrid",
          image: "https://i.imgur.com/dsz1dCN.png",
          level: "baja",
          author: "622f68740b2fa7a2b155e403",
        },
      ],
      userRollerPlaces: [],
    },
  };

  it("renders RollerPlaceDetails component properly", () => {
    const wrapper = shallowMount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
      props: {
        rollerPlaces: {
          _id: "622fb6522ce112a7ddb0c657",
          name: "Paseo de coches - Retiro",
          description: "Pista muy popular entre los rollers",
          location: [-3.68307, 40.41317],
          type: "pista",
          slalom: true,
          city: "Madrid",
          image: "https://i.imgur.com/dsz1dCN.png",
          level: "baja",
          author: "622f68740b2fa7a2b155e403",
        },
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("shows a description", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
        mocks: {
          $store,
        },
        props: { routeId: "622fb6522ce112a7ddb0c657" },
      },
    });

    const element = wrapper.get(".description");
    expect(element.text()).toEqual("Descripción:");
  });

  it("'when 'Update' button is clicked updatePlaceClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    vi.spyOn(wrapper.vm, "updatePlaceClicked");
    wrapper.vm.updatePlaceClicked();
    expect(wrapper.vm.updatePlaceClicked).toHaveBeenCalled();
  });

  it("'when 'Update' button is clicked deletePlaceClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    vi.spyOn(wrapper.vm, "deletePlaceClicked");
    wrapper.vm.deletePlaceClicked();
    expect(wrapper.vm.deletePlaceClicked).toHaveBeenCalled();
  });
});
