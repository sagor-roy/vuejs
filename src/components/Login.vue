<template lang="">
    <div>
        <h1>Login Page</h1>
        <form @submit.prevent="submit">
            <input type="email" v-model="email" placeholder="Enter your email" /><br><br>
            <input type="password" v-model="password" placeholder="Enter your password"><br><br>
            <button type="submit">login</button>
        </form>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';


const email = ref("");
const password = ref("");
const router = useRouter();
const store = useStore();


const getToken = computed(() => store.getters.getToken);

console.log(getToken.value);


const submit = () => {
    if (email.value === "" || password.value === "") {
        alert('Please fill up the input field!!')
        return false;
    }
    const token = generateRandomString(30);
    localStorage.setItem('token', token);
    store.commit('accessToken', token);
    router.push({ path: '/dashboard' })
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


</script>