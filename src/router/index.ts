import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterUserView.vue"),
    },
    {
      path: "/rollerplaces/:routeId",
      name: "details",
      component: () => import("../views/RollerPlaceDetailsView.vue"),
      props: true,
    },
    {
      path: "/",
      name: "rollerplaces",
      component: () => import("../views/RollerPlacesListView.vue"),
    },
  ],
});

export default router;
