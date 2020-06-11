import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/", //開頭大寫
    name: "Home", //開頭大寫
    component: () => import("../views/Home.vue"),
    meta: {
      title: "NoPage", //中文為主 若為英文開頭大寫
      requireAuth: false, //表示是否登入驗證 false 時可省略
      NoNeedHome: false, // 表示不需要父層模板 false 時可省略
    },
  },
  {
    path: "/Login/:id",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登入頁",
      requireAuth: false,
      NoNeedHome: true,
    },
  },
  {
    path: "/Err404",
    name: "Err404",
    component: () => import("../views/Err404.vue"),
    meta: {
      title: "404頁面",
      requireAuth: false,
      NoNeedHome: false,
    },
  },

  // 不存在的路由跳轉
  {
    path: "*",
    redirect: "/Err404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
