<template lang="">
    <header class="bg-purple-100 shadow-gray-200 shadow-md">
                <div class="mx-5 py-4 flex justify-between items-center">
                    <input type="search" placeholder="Search...."
                        class="px-4 text-purple-500 w-50 py-2 rounded-3xl outline-none ring-1 ring-purple-300 bg-purple-200">
                    <ul class="flex items-center gap-x-5">
                        <!-- <template v-if="isLoggedIn"> -->
                            <li><router-link to="/">Dashboard</router-link></li>
                            <li><router-link to="/profile">Profile</router-link></li>
                            <li><button
                                    class="bg-purple-400 px-2 py-1 rounded-lg border-purple-500">Logout</button>
                            </li>
                        <!-- </template> -->
</ul>
</div>
</header>
</template>

<script setup>
</script>
<style lang="">

</style>