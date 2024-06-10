<template>
    <div class="flex">
        <Sidebar/>
        <div class="w-full">
            <Header/>
            <main>
                <section>
                    <router-view></router-view>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '../partials/Sidebar.vue';
import Header from '../partials/Header.vue';
</script>

