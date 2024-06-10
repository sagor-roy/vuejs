<template lang="">
    <aside class="w-[25%] bg-purple-200 h-screen overflow-y-scroll shadow-md shadow-gray-300">
            <div class="my-5">
                <a href="#">
                    <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                        width="48px" fill="#803fce">
                        <path
                            d="M198-160 20-480l180-320h137L158-480l120 216 329-536h152l181 320-180 320H623l179-320-121-214-327 534H198Z" />
                    </svg>
                </a>
            </div>
            <ul>
                <li v-for="(item, index) in menuItems" :key="index"
                    class="bg-purple-300 shadow-sm mx-5 my-2 px-4 py-2 rounded-lg">
                    <div @click="handleClick(item, index)"
                        class="flex items-center gap-x-2 text-purple-700 cursor-pointer">
                        <span class="material-symbols-outlined">{{ item.icon }}</span>
                        <div class="flex items-center justify-between w-full">
                            <span>{{ item.title }}</span>
                            <span v-if="item.submenu" class="material-symbols-outlined">
                                {{ expandedSubmenu === index ? 'expand_more' : 'chevron_right' }}
                            </span>
                        </div>
                    </div>
                    <ul v-if="item.submenu && expandedSubmenu === index"
                        class="text-purple-700 relative flex flex-col gap-y-2 my-3 border-s border-purple-600 ps-5 mx-3">
                        <li v-for="(subitem, subindex) in item.submenu" :key="subindex" class="dash">
                            <router-link class="block" :to="subitem.route">{{ subitem.title }}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const menuItems = ref([
    {
        title: 'Dashboard',
        icon: 'home',
        route: '/',
        submenu: null
    },
    {
        title: 'Table',
        icon: 'table_rows',
        submenu: [
            { title: 'List 1', route: '/profile' },
            { title: 'List 2', route: '/profile' },
            { title: 'List 3', route: '/profile' },
            { title: 'List 4', route: '/profile' },
        ],
        route: null
    },
    {
        title: 'Another Table',
        icon: 'table_rows',
        submenu: [
            { title: 'List 1', route: '/profile' },
            { title: 'List 2', route: '/profile' },
            { title: 'List 3', route: '/profile' },
            { title: 'List 4', route: '/profile' },
        ],
        route: null
    },
    {
        title: 'Profile',
        icon: 'person',
        route: '/profile',
        submenu: null
    }
]);

const expandedSubmenu = ref(null);

const handleClick = (item, index) => {
    if (item.submenu) {
        expandedSubmenu.value = expandedSubmenu.value === index ? null : index;
    } else if (item.route) {
        router.push({ path: item.route });
    }
};
</script>
<style>
.dash::before {
    content: "";
    border-bottom: 1px solid #9449ea;
    position: absolute;
    width: 15px;
    left: 0;
    margin-top: 12px;
}
</style>