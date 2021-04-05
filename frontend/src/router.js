import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login"),
    },

    {
      path: "/user/:id",
      name: "user",
      component: () => import("./components/User"),
      meta: {
        authentificated: true,
      },
    },
    {
      path: "/",
      name: "posts",
      component: () => import("./components/PostsList"),
      meta: {
        authentificated: true,
      },
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("./components/PostsList"),
      meta: {
        authentificated: true,
      },
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("./components/Post"),
      meta: {
        authentificated: true,
      },
    },
    {
      path: "/add-post",
      name: "add-post",
      component: () => import("./components/AddArticle"),
      meta: {
        authentificated: true,
      },
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.authentificated)) {
    if (localStorage.getItem("jwt") !== null) {
      next();
    } else {
      next({ name: "register" });
    }
  } else {
    next();
  }
});

export default router;
