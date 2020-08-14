<template>
  <div id="login">
    <div class="loginContainer">
      <!-- loginTitle -->
      <div class="loginTitle">
        <h1 class="cityTitle">新北市政府</h1>
        <h5 class="cityDescrip">長照交通接送統一預約服務及管理系統</h5>
      </div>
      <!-- adminLogin -->
      <div class="adminLogin" v-if="isForget==1">
        <h2 class="adminLoginTitle">管理者Login</h2>
        <h5 class="adminLoginDescrip">為了保障您的帳號安全，建議您最少於三個月變更一次密碼</h5>
      </div>
      <!-- forgetBox -->
      <div class="forgetBox" v-if="isForget==2">
        <h2 class="forgetTitle">忘記密碼</h2>
        <h5 class="forgetDescrip">請準備好您的手機</h5>
      </div>
      <!-- letterBox -->
      <div class="letterBox" v-if="isForget==3">
        <h2 class="letterTitle">已發送簡訊驗證碼到您的手機</h2>
        <h5 class="letterDescrip">手機號碼：0987-087-334</h5>
      </div>
      <!-- newPwBox -->
      <div class="newPwBox" v-if="isForget==4">
        <h2 class="newPwTitle">設定登入密碼</h2>
        <div class="pwRoles">
          <p :class="{'OkRole':auth.minLength}" class="pwRole">
            <i class="fas fa-check"></i>8碼以上(必要)
          </p>
          <p :class="{'OkRole':auth.upperCase}" class="pwRole">
            <i class="fas fa-check"></i>大寫英文
          </p>
          <p :class="{'OkRole':auth.lowerCase}" class="pwRole">
            <i class="fas fa-check"></i>小寫英文
          </p>
          <p :class="{'OkRole':auth.number}" class="pwRole">
            <i class="fas fa-check"></i>數字
          </p>
          <el-tooltip
            class="item"
            effect="dark"
            content="特殊符號包含 ~!@#$%^&*()"
            placement="bottom-end"
          >
            <p :class="{'OkRole':auth.mark}" class="pwRole">
              <i class="fas fa-check"></i>特殊符號
            </p>
          </el-tooltip>
          <p :class="{'OkRole':num>=3}" class="pwRole">
            <i class="fas fa-check"></i>4選3
          </p>
        </div>
      </div>
      <!-- loginBox -->
      <div class="loginBox" v-if="isForget==1">
        <el-input placeholder="請輸入您的帳號" v-model="accountInput" clearable></el-input>
        <el-input placeholder="請輸入您的密碼" v-model="passwordInput" show-password></el-input>
        <el-button type="warning" @click="handleLogin" round>登入</el-button>
        <div @click="isForget=2" class="forgetPw">忘記密碼?</div>
      </div>
      <!-- forgetInput -->
      <div class="forgetInput" v-if="isForget==2">
        <el-input placeholder="請輸入您的帳號" v-model="accountForgetInput" clearable></el-input>
        <el-button @click="sendCode" type="warning" round>下一步</el-button>
        <p class="fogetPwDesc">點選下一步，發送簡訊驗證碼到您的手機</p>
        <div @click="isForget=1" class="backToLogin">返回登入</div>
      </div>
      <!-- letterInput -->
      <div class="letterInput" v-if="isForget==3">
        <div class="codeBox">
          <el-input class="codeBoxInput" placeholder="請輸入驗證碼" v-model="codeInput" clearable></el-input>
          <el-button
            :disabled="resendCount!==0"
            class="resendBtn"
            @click="sendCode"
            type="warning"
            round
          >
            重新送出
            <span v-if="resendCount!==0">({{resendCount}})</span>
          </el-button>
        </div>
        <el-button @click="valiCode" type="warning" round>下一步</el-button>
        <p class="fogetPwDesc">驗證碼輸入完成後點選下一步並設定新密碼</p>
        <div @click="isForget=1" class="backToLogin">返回登入</div>
      </div>
      <!-- newPwInput -->
      <div class="newPwInput" v-if="isForget==4">
        <el-input placeholder="請輸入您的新密碼" v-model="newPwInput" show-password></el-input>
        <el-input placeholder="請確認您的新密碼" v-model="newPwInputCheck" show-password></el-input>
        <el-button @click="newPwConfirm" type="warning" round>完成</el-button>
        <p class="fogetPwDesc">請依照步驟完成新密碼認證</p>
        <div @click="isForget=1" class="backToLogin">返回登入</div>
      </div>
    </div>

    <!-- announcement -->
    <el-dialog
      v-if="annDataFilter"
      custom-class="annDialog"
      title="公告"
      :visible.sync="dialogAnnVisible"
      center
    >
      <div class="annCategory">
        <button
          @click="annCategory='行車公告'"
          :class="{'activeAnn':annCategory==='行車公告'}"
          class="annCategoryBtn"
        >行車公告</button>
        <button
          @click="annCategory='A單位公告'"
          :class="{'activeAnn':annCategory==='A單位公告'}"
          class="annCategoryBtn"
        >A單位公告</button>
      </div>
      <el-table :data="annDataFilter" style="margin-top:1rem">
        <el-table-column property="title" label="公告事項"></el-table-column>
        <el-table-column property="date" label="公告日期" width="120"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // announcement
      dialogAnnVisible: true,
      annCategory: "行車公告",
      annData: [
        {
          date: "2020-07-10",
          title: "109-07-10【額度控管留用首月】及【轉單功能啟用】",
          category: "A單位公告",
        },
        {
          date: "2020-04-30",
          title: "網頁及APP清除快取步驟說明",
          category: "行車公告",
        },
        {
          date: "2020-07-10",
          title: "109-07-10【轉單功能啟用】",
          category: "行車公告",
        },
        {
          date: "2020-07-13",
          title: "系統進行資安升級，調整期間(7/13 22:30-23:00)暫停使用",
          category: "行車公告",
        },
      ],

      // input
      isForget: 1,
      accountInput: "test",
      passwordInput: "test",
      accountForgetInput: "test",
      codeInput: "",
      newPwInput: "",
      newPwInputCheck: "",
      resendCount: 60,
      timmer: null,

      // 密碼驗證
      passwordOK: false,
      num: 0,
      auth: {
        minLength: false,
        lowerCase: false,
        upperCase: false,
        number: false,
        mark: false,
      },
    };
  },
  computed: {
    annDataFilter() {
      const vm = this;
      return vm.annData.filter((data) => {
        return data.category === vm.annCategory;
      });
    },
  },
  watch: {
    newPwInput(val) {
      this.num = 0;
      this.auth.minLength = this.checkMinLength(val);
      this.auth.lowerCase = this.checkLowerCase(val);
      this.auth.upperCase = this.checkUpperCase(val);
      this.auth.number = this.checkNumber(val);
      this.auth.mark = this.checkMark(val);
      if (this.auth.lowerCase) this.num++;
      if (this.auth.upperCase) this.num++;
      if (this.auth.number) this.num++;
      if (this.auth.mark) this.num++;
      if (this.auth.minLength && this.num >= 3) this.passwordOK = true;
      else this.passwordOK = false;
    },
  },
  methods: {
    handleLogin() {
      const vm = this;
      if (vm.passwordInput == "" || vm.accountInput == "") {
        vm.$alertM.fire({
          icon: "error",
          title: "帳號密碼欄不得為空！",
        });
      } else {
        vm.$store.dispatch("loadingHandler", true);
        vm.$api
          .GetToken({
            password: vm.passwordInput,
            account: vm.accountInput,
            appKey: "123321",
          })
          .then((res) => {
            if (res.data.code == 200) {
              window.localStorage.setItem("NTPCToken", res.data.token);
              vm.getUserInfoByToken();
            } else {
              vm.$alertM.fire({
                icon: "error",
                title: res.data.message,
              });
              vm.$store.dispatch("loadingHandler", false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getUserInfoByToken() {
      const vm = this;
      vm.$api
        .GetUserInfo()
        .then((res) => {
          if (res.data.code == 200) {
            vm.$router.push("/");
          } else {
            vm.$alertM.fire({
              icon: "error",
              title: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          vm.$store.dispatch("loadingHandler", false);
        });
    },

    // 傳送驗證碼
    sendCode() {
      clearInterval(this.timmer);
      const vm = this;
      vm.$store.dispatch("loadingHandler", true);
      vm.$api
        .ForgetPw({
          step: 1,
          account: vm.accountForgetInput,
        })
        .then((res) => {
          if (res.data.code == 200) {
            vm.isForget = 3;
            vm.resendCount = 60;
            vm.timmer = setInterval(() => {
              vm.resendCount--;
              if (vm.resendCount == 0) {
                clearInterval(vm.timmer);
              }
            }, 1000);
          } else {
            vm.$alertM.fire({
              icon: "error",
              title: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          vm.$store.dispatch("loadingHandler", false);
        });
    },

    //認證驗證碼是否正確
    valiCode() {
      const vm = this;
      vm.$store.dispatch("loadingHandler", true);
      vm.$api
        .ForgetPw({
          step: 2,
          account: vm.accountForgetInput,
          checkCode: vm.codeInput,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.isForget = 4;
            clearInterval(this.timmer);
          } else {
            vm.$alertM.fire({
              icon: "error",
              title: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          vm.$store.dispatch("loadingHandler", false);
          clearInterval(this.timmer);
        });
    },

    // 修改密碼
    newPwConfirm() {
      const vm = this;
      if (vm.passwordOK && vm.newPwInput === vm.newPwInputCheck) {
        vm.$store.dispatch("loadingHandler", true);
        vm.$api
          .ForgetPw({
            step: 3,
            account: vm.accountForgetInput,
            checkCode: vm.codeInput,
            newPassword: vm.newPwInput,
          })
          .then((res) => {
            if (res.data.code == 200) {
              vm.$alertM.fire({
                icon: "success",
                title: `修改密碼成功!請重新登入!`,
              });
              vm.reset();
              vm.isForget = 1;
            } else {
              vm.$alertM.fire({
                icon: "error",
                title: res.data.message,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            vm.$store.dispatch("loadingHandler", false);
          });
      } else if (!vm.passwordOK) {
        vm.$alertM.fire({
          icon: "error",
          title: `請確認密碼格式是否正確`,
        });
      } else {
        vm.$alertM.fire({
          icon: "error",
          title: `密碼欄位不相等`,
        });
      }
    },

    // 欄位清空
    reset() {
      const vm = this;
      vm.accountInput = "";
      vm.passwordInput = "";
      vm.accountForgetInput = "";
      vm.codeInput = "";
      vm.newPwInput = "";
      vm.newPwInputCheck = "";
    },

    // 密碼格式REG驗證
    checkMinLength(val) {
      //8碼以上
      return val.length >= 8;
    },
    checkLowerCase(val) {
      //小寫英文
      return /[a-z]/.test(val);
    },
    checkUpperCase(val) {
      //大寫英文
      return /[A-Z]/.test(val);
    },
    checkNumber(val) {
      //數字
      return /[0-9]/.test(val);
    },
    checkMark(val) {
      //特殊符號
      return /[~!@#$%^&*()]/.test(val);
    },
  },
};
</script>

<style lang='scss'>
</style>