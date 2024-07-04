<template>
    <header class="bg-purple-200 shadow-sm">
        <div class="container py-3 flex justify-between items-center mx-auto">
            <router-link to="/" class="text-purple-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px"
                    fill="#7e22ce">
                    <path
                        d="M401.82-341.69 618.31-480 401.82-618.31v276.62Zm78.41 218.87q-73.96 0-139.04-28.22t-113.58-76.69q-48.51-48.47-76.65-113.32-28.14-64.85-28.14-138.72 0-74.11 28.22-139.45 28.22-65.33 76.69-113.67t113.32-76.31q64.85-27.98 138.72-27.98 74.11 0 139.45 28.13 65.34 28.13 113.68 76.36 48.33 48.22 76.3 113.33 27.98 65.11 27.98 139.13 0 73.96-28.05 139.04-28.06 65.08-76.36 113.58-48.3 48.51-113.41 76.65-65.11 28.14-139.13 28.14Zm-.28-32.44q135.24 0 230.02-94.8 94.77-94.81 94.77-229.89 0-135.24-94.72-230.02-94.73-94.77-229.97-94.77-135.09 0-229.94 94.72-94.85 94.73-94.85 229.97 0 135.09 94.8 229.94 94.81 94.85 229.89 94.85ZM480-480Z" />
                </svg>
                <span class="text-2xl font-bold">JETFLIX</span>
            </router-link>

            <div class="flex items-center gap-x-10">
                <div class="relative text-purple-700 cursor-pointer">
                    <span @click="notificationsShowHandler" class="material-symbols-outlined ">notifications</span>
                    <span @click="notificationsShowHandler"
                        class="absolute bg-purple-400 text-sm text-white py-0 -right-4 -top-3 px-2 rounded-full">{{
                        unreadNotiCount }}</span>
                    <ul v-if="notificationsPanelStatus"
                        class="absolute w-60 bg-purple-300 p-3 rounded-md shadow-md divide-y divide-purple-600 space-y-2 text-sm z-50 right-0">
                        <li v-for="(item, index) in noti" :key="index"><button @click="markAsReadHandler(item)"
                                class="flex" :class="item.read_at ? '' : 'bg-purple-200 rounded-lg p-1'">
                                <span class="material-symbols-outlined">account_circle</span>
                                <div class="text-start">
                                    <span class="text-purple-600 bg-purple-200 rounded-sm p-[1px_2px] italic">@{{
                        item.data.sender_name }} </span>
                                    <span> reply to your comment</span>
                                </div>
                            </button></li>
                    </ul>
                </div>
                <div v-if="user" class="relative">
                    <div @click="toggle" class="flex items-center font-semibold gap-x-1 text-purple-700 cursor-pointer">
                        <span class="material-symbols-outlined">
                            account_circle
                        </span>
                        <h4>{{ user?.user?.name }}</h4>
                        <span class="material-symbols-outlined">
                            keyboard_arrow_down
                        </span>
                    </div>
                    <ul :class="display ? 'flex' : 'hidden'"
                        class="absolute bg-purple-100 z-10 w-40 gap-y-3 flex-col mt-3 p-3 rounded-md shadow-md">
                        <li><a href="#" class="flex text-purple-500 items-center gap-x-1">
                                <span class="material-symbols-outlined">
                                    person
                                </span>
                                <span>Profile</span>
                            </a></li>
                        <li><a href="#" class="flex text-purple-500 items-center gap-x-1">
                                <span class="material-symbols-outlined">
                                    edit_square
                                </span>
                                <span>Edit</span>
                            </a></li>
                        <li><button type="button" @click="logout" class="flex text-purple-500 items-center gap-x-1">
                                <span class="material-symbols-outlined">
                                    logout
                                </span>
                                <span>Logout</span>
                            </button></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { apiService } from '@/axios/apiService';
import { useAuthStore } from '@/store/auth';
import { useNotificationStore } from '@/store/notificatoin';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Pusher from 'pusher-js';

const authStore = useAuthStore();
const notificationsStore = useNotificationStore();
const { notifications } = storeToRefs(notificationsStore);
const router = useRouter();
const { user } = storeToRefs(authStore);
const noti = ref([]);
const unreadNotiCount = ref(0);
const notificationsPanelStatus = ref(false)

onMounted(async () => {
    await fetchNotifications();
})

watch(
    () => router.currentRoute.value.fullPath,
    async () => {
        await fetchNotifications();
    }
);

const fetchNotifications = async () => {
    await notificationsStore.fetchNotifications();
    noti.value = notifications.value
    unreadNotiCount.value = 0;
    noti.value.forEach((item, index) => {
        if (!item.read_at) {
            unreadNotiCount.value++;
        }
    })
}

const notificationsShowHandler = () => notificationsPanelStatus.value = !notificationsPanelStatus.value;

const markAsReadHandler = async (item) => {
    try {
        const response = await apiService.get(`/notification-read/${item.id}`);
        if (response.data.status === 'success') {
            await fetchNotifications();
            router.push({ path: `/video/${item.data.video_slug_id}` });
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            authStore.removeUserWithToken();
            router.push({ path: '/login' });
        } else {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    }

}

const logout = async () => {
    try {
        const response = await apiService.post(`/logout`);
        if (response.data.status === 'success') {
            authStore.removeUserWithToken();
            router.push({ path: '/login' });
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            authStore.removeUserWithToken();
            router.push({ path: '/login' });
        } else {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    }
}

const display = ref(false);
const toggle = () => {
    display.value = !display.value
}



</script>