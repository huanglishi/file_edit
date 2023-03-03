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
  {
    path: "/fw",
    name: "fw",
    component:() => import('/@/views/FileWrite/index.vue'),
  },
  {
    path: "/fp",
    name: "fp",
    component:() => import('/@/views/FilePrint/index.vue'),
  },
  {
    path: "/cp",
    name: "cp",
    component:() => import('/@/views/cprint/index.vue'),
  },
  {
    path: "/home",
    name: "home",
    component:() => import('/@/views/Home.vue'),
  },
];

const router = createRouter({
  history:   createWebHistory(),
  routes,
});

export default router;
