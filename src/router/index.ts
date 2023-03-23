import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/onlyedit",
    name: "onlyedit",
    component: Home,
  },
  {
    path: "/e",
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
    path: "/pp",
    name: "pp",
    component:() => import('/@/views/pagePrint/index.vue'),
  },
  {
    path: "/",
    name: "pe",
    component:() => import('/@/views/pageEditor/index.vue'),
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
