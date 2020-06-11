import req from "./https";

// 全域 api 掛載於 Vue.prototype
// 使用方式 this.$api
// api 命名原則 首字大寫爾後駝峰
const api = {
  CaseUserCommonAddr(id) {
    return req("get", `CaseUserCommonAddr/GetByContactId?contactUserId=${id}`);
  },
};

export default api;
