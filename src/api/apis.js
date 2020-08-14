import req from "./https";

// 全域 api 掛載於 Vue.prototype
// 使用方式 this.$api
// api 命名原則 首字大寫爾後駝峰
const api = {
  // login
  GetToken(params) {
    return req("post", "Check/Login", params);
  },
  GetUserInfo(params) {
    return req("get", "Check/GetUserProfile", params);
  },

  // forgetPw
  ForgetPw(params) {
    return req("post", "Users/ForgetPwd", params);
  },
};

export default api;
