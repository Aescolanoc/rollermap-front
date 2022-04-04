import { beforeAll } from "vitest";
// import vue from "vue";
// import Deferred from "my-deferred";
// import mapboxgl from "mapbox-gl";
// import vuemapbox from "vue-mapbox-ts";

(global as any).CSS = { supports: () => false };

// const app = createApp({});
// app.use(vuemapbox);
// (global as any).Vue = {};
// global.Deferred = Deferred;
// global.mapboxgl = mapboxgl;
// global.MapboxGeocoder = {};
// global.Deferred$1 = {};

beforeAll(() => {
  class ResizeObserver {
    callback?: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }

    observe() {
      this.callback?.([], this);
    }

    unobserve() {
      this.callback = undefined;
    }

    disconnect() {
      this.callback = undefined;
    }
  }

  (global as any).ResizeObserver = ResizeObserver;
  (global as any).CSS = { supports: () => false };
  // const app = createApp({});
  // app.use(vuemapbox);
  // (global as any).Vue = {};
  // global.Deferred = Deferred;
  // global.mapboxgl = mapboxgl;
  // global.MapboxGeocoder = {};
  // global.Deferred$1 = {};
});
