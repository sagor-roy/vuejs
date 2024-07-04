<template>
  <div>
    <StripeCheckout ref="checkoutRef" :pk="publishableKey" :sessionId="sessionId" />
    <button @click="submit" class="bg-red-500 rounded-lg text-white px-3 py-2 shadow-md mt-4">Subscription Now</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';

const publishableKey = ref('pk_test_51Idt0lHrphbfnYmf9dVkg0ISfHPsFUSn1MvwkhuKimItw1H56xZZllF2maUrYzo9Z9SZRwzPjIXgzbHDtN9pq9Mx00L5KFK28u');
const sessionId = ref('cs_test_a11dPgUYEjo8yQAx1nsLOytJNE3Un9PnhjrBOHCJYY2y7a8ORc4IW42nex');
const checkoutRef = ref(null);

const submit = () => {
  checkoutRef.value.redirectToCheckout();
};
</script>
