import router from "../router/index";

// 跳轉回首頁
// 登入完成後跳轉回原頁面
export const toLogin = () => {
  router.replace({
    name: "Login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};

// 跳轉到404頁面
export const to404Page = () => {
  router.replace({
    name: "Err404",
  });
};
