import { describe, it, expect, vi } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";
import TestComponent from "@/components/RollerPlaceForm.vue";

describe("RollerPlaceForm component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();

  const routeIdMock = "1";
  const placeTypeMock = "rink";
  const placeLevelMock = "begginer";
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

  it("renders properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
      props: { routeId: routeIdMock, PlaceType: placeTypeMock, PlaceLevel: placeLevelMock, place: placeObj },
    });
    expect(wrapper).toBeTruthy();
  });

  it("uploadPhoto function is called", async () => {
    const rollerMapStore = pinia({});
    vi.spyOn(rollerMapStore, "add");
    let saveClickedMock = vi.fn();

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
      props: { routeId: routeIdMock, PlaceType: placeTypeMock, PlaceLevel: placeLevelMock, place: placeObj },
      methods: { saveClicked: saveClickedMock },
    });
    vi.spyOn(wrapper.vm, "saveClickedMock");
    await wrapper.vm.registerClicked();
    expect(wrapper.vm.saveClicked).toHaveBeenCalled();
  });

  it("mapClicked function is called", async () => {
    const rollerMapStore = pinia({});
    vi.spyOn(rollerMapStore, "createRollerPlace");
    let saveClickedMock = vi.fn();

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
      props: { routeId: routeIdMock, PlaceType: placeTypeMock, PlaceLevel: placeLevelMock, place: placeObj },
      methods: { saveClicked: saveClickedMock },
    });
    const element = VueWrapper(".rollerplace-form_map");
    element.trigger("click");
    expect(saveClickedMock).toHaveBeenCalled();
  });
});
