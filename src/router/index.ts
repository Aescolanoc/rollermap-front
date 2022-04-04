import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "../helpers/utils";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/UserFormView.vue"),
    },

    {
      path: "/users",
      redirect: "/users/:userId",
      component: () => import("../views/PageLayout.vue"),
      children: [
        {
          path: ":userId",
          name: "userform",
          component: () => import("../views/UserFormView.vue"),
          props: true,
        },
      ],
    },

    {
      path: "/rollerplaces",
      redirect: "/rollerplaces/all",
      component: () => import("../views/PageLayout.vue"),
      children: [
        {
          // All RollerPlaces List
          path: "all",
          name: "rollerplaces",
          component: () => import("../views/RollerPlacesListView.vue"),
        },
        {
          // RollerPLace Detail
          path: ":routeId",
          name: "details",
          component: () => import("../views/RollerPlaceDetailsView.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/myrollerplaces",
      redirect: "/myrollerplaces/all",
      component: () => import("../views/PageLayout.vue"),
      children: [
        {
          path: "all",
          name: "myrollerplaces",
          component: () => import("../views/MyRollerPlacesView.vue"),
        },
        {
          path: "new",
          name: "newrollerplace",
          component: () => import("../components/RollerPlaceForm.vue"),
        },
        {
          path: "edit/:routeId",
          name: "editrollerplace",
          component: () => import("../components/RollerPlaceForm.vue"),
          props: true,
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  if (!getToken() && to.name !== "login" && to.name !== "register") {
    return { name: "login" };
  }
});

export default router;
