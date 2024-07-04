<template>
    <div class="container mx-auto">
        <div class="text-center my-10">
            <h1 class="text-3xl font-bold">Subscription Plan</h1>
        </div>
        <div class="grid grid-cols-12 gap-y-5">
            <div class="col-span-12 sm:col-span-6 mx-5 lg:col-span-4 text-center px-7 py-5 border rounded-md shadow-sm">
                <h1 class="text-3xl font-bold mb-4">JetFlix</h1>
                <h3 class="text-2xl">Free Plan</h3>
                <p class="mt-6">Get access to ad-free videos, music streaming, and exclusive content with our premium
                    subscription plan.</p>
                <h2 class="mt-5"><strong>Price: </strong>0&#2547;/5 Days</h2>
                <StripeCheckout v-if="sessionId" ref="checkoutRef" :pk="publishableKey" :sessionId="sessionId" />
                <button @click="submit" type="button"
                    class="bg-red-500 rounded-lg text-white px-3 py-2 shadow-md mt-4">Subscribe
                    Now</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { apiService } from '@/axios/apiService';

const publishableKey = ref('pk_test_51Idt0lHrphbfnYmf9dVkg0ISfHPsFUSn1MvwkhuKimItw1H56xZZllF2maUrYzo9Z9SZRwzPjIXgzbHDtN9pq9Mx00L5KFK28u');
const sessionId = ref('');
const checkoutRef = ref(null);

const getSessionId = async () => {
    try {
        const response = await apiService.get('/checkout');
        sessionId.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            // authStore.removeUserWithToken();
            // router.push({ path: '/login' });
        } else {
            console.error(error);
        }
    }
};

const submit = async () => {
    await getSessionId();

    if (checkoutRef.value) {
        checkoutRef.value.redirectToCheckout();
    }
};

</script>
