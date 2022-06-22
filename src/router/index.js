import Vue from "vue";
import VueRouter from "vue-router";
import Principal from "../views/Principal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Principal",
    component: Principal,
  },
  {
    path: "/favoritos",
    name: "Favoritos",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Favoritos" */ "../views/Favoritos.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
