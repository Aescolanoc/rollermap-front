import { describe, it, expect, vi } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/components/RollerPlaceCard.vue";
import { createRouter, createWebHistory } from "vue-router";

describe("RollerPlaceCard component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();

  let placeObj = {
    _id: "123",
    name: "Paseo de coches - Retiro",
    description: "Pista muy popular entre los rollers",
    location: [-3.68307, 40.41317],
    trace: [],
    type: "pista",
    slalom: true,
    city: "Madrid",
    image: "https://i.imgur.com/dsz1dCN.png",
    level: "baja",
    author: "author",
  };

  const stubs = {
    MapboxMap: {
      template: "<div/>",
    },
    MapboxMarker: {
      template: "<div/>",
    },
  };

  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  it("RollerPlaceCard component renders properly", () => {
    let isRinkMock = vi.fn();
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
        stubs: stubs,
      },
      props: { place: placeObj },
      methods: {
        isRink: isRinkMock,
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("RollerPlaceCard component shows a title", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia, router],
        stubs: stubs,
      },
      props: { place: placeObj },
    });

    const element = wrapper.get(".v-card-title.name");
    expect(element.text()).toEqual("Paseo de coches - Retiro");
  });

  it("'when 'favorite' icon is clicked favoriteClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia, router],
      },
      props: { place: placeObj },
    });

    vi.spyOn(wrapper.vm, "favoriteClicked");
    wrapper.vm.placeId = "123";
    wrapper.vm.favoriteClicked();
    expect(wrapper.vm.favoriteClicked).toHaveBeenCalled();
  });

  it("'when 'See more' icon is clicked detailsClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia, router],
      },
      props: { place: placeObj },
    });

    vi.spyOn(wrapper.vm, "detailsClicked");
    wrapper.vm.placeId = "123";
    wrapper.vm.detailsClicked();
    expect(wrapper.vm.detailsClicked).toHaveBeenCalled();
  });
});
