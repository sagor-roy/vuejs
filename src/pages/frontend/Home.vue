<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-1 mx-2 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
            <router-link :to="`/video/${video.video_id}`" v-for="video in videos" :key="video.id"
                class="bg-purple-100 relative shadow-md rounded-md overflow-hidden">
                <img :src="`https://i.ytimg.com/vi/${video.video_id}/maxresdefault.jpg`" alt="img" />
                <h1 class="text-lg pt-3 pb-16 px-5 text-purple-500">{{ video.title }}</h1>
                <div class="flex absolute w-full bottom-0 justify-between px-5 text-purple-400 py-4">
                    <div class="flex items-center gap-x-1">
                        <span class="material-symbols-outlined">timer</span><span>{{ video.duration }}</span>
                    </div>
                    <span>{{ video.publish_time }}</span>
                </div>
            </router-link>
        </div>
        <div v-if="visible" ref="loadMore" class="text-center mb-10">
            <div class="spin mx-auto"></div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { apiService } from '@/axios/apiService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const videos = ref([]);
const loadMore = ref(null);
const page = ref(0);
const visible = ref(true);
const lastPage = ref(1);
let observer;



const fetchData = async (page = 1) => {
    try {
        const response = await apiService.get(`/videos?page=${page}`);
        if (response.data.status === 'success') {
            videos.value.push(...response.data.data.data);
            lastPage.value = response.data.data.last_page;
            if (page >= lastPage.value) {
                visible.value = false;
            }
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            authStore.removeUserWithToken();
            router.push({ path: '/login' });
        }
    }
}


const handleIntersect = (entries) => {
    if (entries[0].isIntersecting) {
        page.value++;
        if (page.value <= lastPage.value) {
            setTimeout(() => {
                fetchData(page.value);
            }, 500);
        }
    }
};

onMounted(() => {
    observer = new IntersectionObserver(handleIntersect);
    observer.observe(loadMore.value);
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});


</script>


<style>
.spin {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    /*   background-color : red; */
    border: 5px solid #ccc;
    border-top-color: #803fce;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>