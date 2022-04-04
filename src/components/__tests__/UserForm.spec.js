import { describe, it, expect, vi, afterEach } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/components/UserForm.vue";

vi.mock("../../services/api", () => {
  return {
    login: vi.fn(() => Promise.resolve("OK")),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("UserForm component", () => {
  const vuetify = createVuetify({ components, directives });
  const pinia = createTestingPinia();

  let newUserMock = {
    name: "Pepe",
    email: "pepe@pepe.es",
    password: "12345",
  };

  it("renders UserForm component properly", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    expect(wrapper).toBeTruthy();
  });

  it("shows 'Register' button", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    expect(wrapper.text()).toContain("Registro");

    const element = wrapper.get(".v-btn.v-btn--elevated");
    expect(element.text()).toEqual("Registro");
  });

  it("when 'Register' button is clicked registerClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
      props: { user: newUserMock },
    });

    vi.spyOn(wrapper.vm, "registerClicked");

    wrapper.vm.checkbox = true;
    wrapper.vm.registerClicked();
    expect(wrapper.vm.registerClicked).toHaveBeenCalled();
  });

  it("'when 'Update' button is clicked updateClicked function is called", () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    vi.spyOn(wrapper.vm, "updateClicked");
    wrapper.vm.updateClicked();
    expect(wrapper.vm.updateClicked).toHaveBeenCalled();
  });
});
