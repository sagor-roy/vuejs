import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/backend/Dashboard.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import PageNotFound from "@/components/PageNotFound.vue";
import BackendLayout from "@/pages/backend/layouts/Layout.vue";
import FrontendLayout from "@/pages/frontend/layouts/FrontendLayout.vue";
import Home from "@/pages/frontend/Home.vue";
import Video from "@/pages/frontend/Video.vue";
import { useAuthStore } from "./store/auth";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            guest: true
        }
    },
    {
        path: "/",
        component: FrontendLayout,
        meta: {
            auth: true
        },
        children: [
            {
                path: "/",
                name: "Home",
                component: Home,
            },
            {
                path: "/video/:id",
                name: "Video",
                component: Video,
            },
        ],
    },
    {
        path: "/admin",
        component: BackendLayout,
        meta: {
            auth: false, // This applies to all child routes
        },
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
        ],
    },
    {
        path: "/:catchAll(.*)",
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

//Global navigation guard
router.beforeEach((to, from, next) => {
    NProgress.start();
    const authStore = useAuthStore();
    const token = authStore.user ? authStore.user.token : '';
    if (to.meta.auth && !token) {
        next({ path: '/login' });
    } else if (to.meta.guest && token) {
        next({ path: '/' });
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    setTimeout(() => {
        NProgress.done();
    }, 500);
})

export default router;
