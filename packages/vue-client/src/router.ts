import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Broker from "./views/Broker.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/broker",
      name: "broker",
      component: Broker
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ]
});
