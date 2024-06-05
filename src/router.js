
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/components/Dashboard.vue';
import Profile from '@/components/Profile.vue';
import Login from '@/components/Login.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import store from './store';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            guest: true, // This route is accessible only for guests
        },
    },
    {
        path: '/',
        meta: {
            auth: true, // This applies to all child routes
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile,
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        component: PageNotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
    const tokenValue = store.state.token;
    const isLoggedIn = tokenValue ? true : false;
    if (to.meta.auth && !isLoggedIn) {
        // If the route requires authentication and the user is not logged in
        next({ path: '/login' });
    } else if (to.meta.guest && isLoggedIn) {
        // If the route is for guests and the user is logged in
        next({ path: '/dashboard' });
    } else {
        // If none of the above conditions are met, allow access
        next();
    }
});


export default router;