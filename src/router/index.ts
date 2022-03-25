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
      component: () => import("../views/UserFormView.vue"),
      props: true,
    },
    {
      path: "/users/:userId",
      name: "userform",
      component: () => import("../views/UserFormView.vue"),
      props: true,
    },

    {
      path: "/",
      name: "rollerplaces",
      component: () => import("../views/RollerPlacesListView.vue"),
    },
    {
      path: "/myrollerplaces",
      name: "myrollerplaces",
      component: () => import("../views/MyRollerPlacesView.vue"),
    },
    {
      path: "/rollerplaces/new",
      name: "newrollerplace",
      component: () => import("../components/RollerPlaceForm.vue"),
      props: true,
    },
    {
      path: "/rollerplaces/:routeId",
      name: "editrollerplace",
      component: () => import("../components/RollerPlaceForm.vue"),
      props: true,
    },
    {
      path: "/rollerplaces/:routeId",
      name: "details",
      component: () => import("../views/RollerPlaceDetailsView.vue"),
      props: true,
    },
  ],
});

export default router;
