<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="w-full shadow-lg p-7 sm:w-full mx-5 md:w-[30%] bg-gray-100 rounded-lg ring-1 ring-gray-300">
            <h1 class="text-center text-2xl font-bold text-gray-700">REGISTER</h1>
            <form @submit.prevent="submit" class="mt-5 flex flex-col gap-y-4">
                <div>
                    <input type="text" v-model="name" @input="clearError('name')"
                        class="w-full ring-1 ring-gray-300 rounded-lg outline-none p-2" placeholder="Enter your name" />
                    <span class="text-red-500 italic text-xs" v-if="errors.name">{{ errors.name[0] }}</span>
                </div>
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
                <div>
                    <input type="password" v-model="password_confirmation" @input="clearError('password_confirmation')"
                        class="w-full ring-1 ring-gray-300 rounded-lg outline-none p-2"
                        placeholder="Enter your confirm password" />
                    <span class="text-red-500 italic text-xs" v-if="errors.password_confirmation">{{
                errors.password_confirmation[0]
            }}</span>
                </div>
                <button :disabled="false" type="submit"
                    class="bg-purple-400 ring-purple-500 hover:bg-purple-500 ring-1 rounded-lg mt-5 py-2">{{ !submitBtn
                ? 'Register':'Loading....' }}</button>
            </form>

            <div class="text-center mt-5">
                <router-link class="text-purple-400 underline" to="/login">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { apiService } from '@/axios/apiService';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const errors = ref({});
const submitBtn = ref(false);


const router = useRouter();
const authStore = useAuthStore();
const { userWithTokenStore, removeUserWithToken } = authStore;

const submit = async () => {
    submitBtn.value = true;
    try {
        const response = await apiService.post(`/register`, { name: name.value, email: email.value, password: password.value, password_confirmation: password_confirmation.value });
        if (response.data.status === 'success') {
            const userWithToken = response.data.data;
            localStorage.setItem('_user', JSON.stringify(userWithToken));
            userWithTokenStore(userWithToken);
            if (userWithToken?.user?.role === 'user') {
                router.push({ path: '/' })
            } else {
                router.push({ path: '/admin/dashboard' })
            }
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        const response = error.response;
        if (response && response.status === 401) {
            removeUserWithToken();
            router.push({ path: '/login' });
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