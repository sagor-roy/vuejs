<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-full shadow-lg p-7 sm:w-full mx-5 md:w-[30%] bg-gray-100 rounded-lg ring-1 ring-gray-300">
            <h1 class="text-center text-2xl font-bold text-gray-700">LOGIN</h1>
            <div v-if="unauthorizedMessage"
                class="bg-red-100 text-red-400 border border-red-300 mt-4 px-4 py-2 rounded-lg">
                <span><strong>Opps! </strong> {{ unauthorizedMessage }}</span>
            </div>
            <form @submit.prevent="submit" class="mt-5 flex flex-col gap-y-4">
                <div>
                    <input type="email" v-model="email" @input="clearError('email')"
                        class="w-full ring-1 ring-gray-300 rounded-lg outline-none p-2"
                        placeholder="Enter your email" />
                    <span class="text-red-500 italic text-xs" v-if="errors.email">{{ errors.email[0] }}</span>
                </div>
                <div>
                    <input type="password" v-model="password" @input="clearError('password')"
                        class="w-full ring-1 ring-gray-300 rounded-lg outline-none p-2"
                        placeholder="Enter your password" />
                    <span class="text-red-500 italic text-xs" v-if="errors.password">{{ errors.password[0] }}</span>
                </div>
                <button :disabled="false" type="submit"
                    class="bg-purple-400 ring-purple-500 hover:bg-purple-500 ring-1 rounded-lg mt-5 py-2">{{ !submitBtn
                ? 'Login' : 'Loading....' }}</button>
            </form>

            <div class="text-center mt-5">
                <router-link class="text-purple-400 underline" to="/register">Register</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { apiService } from '@/axios/apiService';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const email = ref("");
const password = ref("");
const errors = ref({});
const submitBtn = ref(false);
const unauthorizedMessage = ref("");


const router = useRouter();
const authStore = useAuthStore();
const { userWithTokenStore } = authStore;

const submit = async () => {
    submitBtn.value = true;
    try {
        const response = await apiService.post(`/login`, { email: email.value, password: password.value });
        if (response.data.status === 'success') {
            localStorage.setItem('_user', JSON.stringify(response.data.data));
            userWithTokenStore(response.data.data);
            router.push({ path: '/' });
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        const response = error.response;
        if (response && response.status === 401 || response.status === 429) {
            unauthorizedMessage.value = response.data.message
            setTimeout(() => {
                unauthorizedMessage.value = ""
            }, 5000);
        } else if (response && response.status === 422) {
            errors.value = response.data.data;
        }
    } finally {
        submitBtn.value = false;
    }
}

const clearError = (field) => {
    if (errors.value[field]) {
        delete errors.value[field];
    }
};
</script>