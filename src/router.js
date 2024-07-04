// Import necessary dependencies
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

// Define routes
const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/auth/Login.vue"),
        meta: {
            guest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/pages/auth/Register.vue"),
        meta: {
            guest: true
        }
    },
    {
        path: "/",
        component: () => import("@/pages/frontend/layouts/FrontendLayout.vue"),
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "Home",
                component: () => import("@/pages/frontend/Home.vue"),
            },
            {
                path: "video/:id",
                name: "Video",
                component: () => import("@/pages/frontend/Video.vue"),
            },
            {
                path: "subscription",
                name: "Subscription",
                component: () => import("@/pages/frontend/Subscription.vue"),
            },
            // {
            //     path: "checkout/:slug",
            //     name: "Checkout",
            //     component: () => import("@/pages/frontend/Checkout.vue"),
            // },
        ],
    },
    {
        path: "/admin",
        redirect: '/admin/dashboard',
        component: () => import("@/pages/backend/layouts/Layout.vue"),
        meta: {
            auth: true,
            admin: true
        },
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => import("@/pages/backend/Dashboard.vue"),
            },
        ],
    },
    {
        path: "/:catchAll(.*)",
        component: () => import("@/components/PageNotFound.vue"),
    },
];

// Create router
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    NProgress.start();
    const authStore = useAuthStore();
    const user = authStore.user?.user;
    const token = authStore.user?.token;

    if (to.meta.auth && !token) {
        next({ path: '/login' });
    } else if (to.meta.guest && token) {
        if (user.role === 'admin') {
            next({ path: '/admin/dashboard' });
        } else {
            next({ path: '/' });
        }
    } else if (to.meta.auth && token) {
        if (to.meta.admin && user.role == 'user') {
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
