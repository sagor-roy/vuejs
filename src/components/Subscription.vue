<template>
    <div>
        <stripe-checkout ref="checkoutRef" mode="subscription" :pk="publishableKey" :line-items="lineItems"
            :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
        <button @click="submit">Subscribe!</button>
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    components: {
        StripeCheckout,
    },
    data() {
        this.publishableKey = 'pk_test_51Idt0lHrphbfnYmf9dVkg0ISfHPsFUSn1MvwkhuKimItw1H56xZZllF2maUrYzo9Z9SZRwzPjIXgzbHDtN9pq9Mx00L5KFK28u';
        return {
            loading: false,
            lineItems: [
                {
                    price: 'some-price-id',
                    quantity: 1,
                },
            ],
            successURL: 'your-success-url',
            cancelURL: 'your-cancel-url',
        };
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
};
</script>