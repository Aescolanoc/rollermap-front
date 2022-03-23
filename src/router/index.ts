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
      component: () => import("../views/registerUserView.vue"),
    },
    {
      path: "/",
      name: "rollerplaces",
      component: () => import("../views/RollerPlacesView.vue"),
    },
  ],
});

export default router;
