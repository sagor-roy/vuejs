<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-full shadow-lg p-7 sm:w-full mx-5 md:w-[30%] bg-gray-100 rounded-lg ring-1 ring-gray-300">
            <h1 class="text-center text-2xl font-bold text-gray-700">Login</h1>
            <form @submit.prevent="submit" class="mt-5 flex flex-col gap-y-4">
                <input type="email" v-model="email" class="w-full ring-1 ring-gray-300 rounded-lg outline-none p-2" placeholder="Enter your email" />
                <input type="password" v-model="password" class="w-full ring-1 ring-gray-300 rounded-lg outline-none p-2" placeholder="Enter your password">
                <span class="flex gap-x-1">
                    <input type="checkbox" id="remember">
                    <label for="remember">Remember me?</label>
                </span>
                <button type="submit" class="bg-purple-400 ring-purple-500 hover:bg-purple-500 ring-1 rounded-lg mt-5 py-2">login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';


const email = ref("test@example.com");
const password = ref("11223344");
const router = useRouter();
const store = useStore();


const getToken = computed(() => store.getters.getToken);



const submit = () => {
    if (email.value === "" || password.value === "") {
        alert('Please fill up the input field!!')
        return false;
    }

    fetch('http://127.0.0.1:8000/api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value, password: password.value })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.status) {
                localStorage.setItem('token', data.token);
                store.commit('accessToken', data.token);
                router.push({ path: '/dashboard' })
            } else {
                alert(data.message)
            }
        })

}



</script>