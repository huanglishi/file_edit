import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/onlyedit",
    name: "onlyedit",
    component: Home,
  },
  {
    path: "/",
    name: "Editor",
    component:() => import('/@/views/FileEditor/index.vue'),
  },
];

const router = createRouter({
  history:   createWebHistory(),
  routes,
});

export default router;
