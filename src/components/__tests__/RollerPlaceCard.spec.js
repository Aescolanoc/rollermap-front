import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/components/RollerPlaceCard.vue";

describe("HelloWorld", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();
  let placeObj = {
    _id: "622fb6522ce112a7ddb0c657",
    name: "Paseo de coches - Retiro ",
    desciption: "Pista muy popular entre los rollers",
    location: [-3.68307, 40.41317],
    type: "pista",
    slalom: true,
    city: "Madrid",
    image: "https://i.imgur.com/dsz1dCN.png",
    level: "baja",
    author: "622f68740b2fa7a2b155e403",
  };

  it("renders properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
      props: { place: placeObj },
    });
    expect(wrapper.text()).toContain("Paseo de coches - Retiro");
  });
});
