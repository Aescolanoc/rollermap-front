import { describe, it, expect, vi, afterEach } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TestComponent from "@/views/LoginView.vue";

vi.mock("../../services/api", () => {
  return {
    login: vi.fn(() => Promise.resolve("OK")),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("LoginView component", () => {
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

  it("'when 'login' button is clicked loginClicked function is called", async () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    vi.spyOn(wrapper.vm, "loginClicked");
    await wrapper.vm.loginClicked();
    expect(wrapper.vm.loginClicked).toHaveBeenCalled();
  });

  it("'when 'register' button is clicked registerClicked function is called", async () => {
    const wrapper = mount(TestComponent, {
      global: {
        plugins: [vuetify, pinia],
      },
    });

    vi.spyOn(wrapper.vm, "registerClicked");
    await wrapper.vm.registerClicked();
    expect(wrapper.vm.registerClicked).toHaveBeenCalled();
  });
});
