import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";

import "material-design-icons-iconfont/dist/material-design-icons.css";

require("@/store/subscriber");

axios.defaults.baseURL = "http://localhost:3001/api";

Vue.config.productionTip = false;

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() =>
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app")
);
