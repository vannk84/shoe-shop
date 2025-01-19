<template>
  <div class="w-full bg-white shadow rounded-lg">
    <div class="p-4">
      <h2 class="font-bold tracking-tight">Order Summary</h2>
    </div>
    <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <dt class="text-sm">Subtotal</dt>
        <dd class="text-sm font-medium text-gray-900">{{ subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-sm">Shipping</dt>
        <dd class="text-sm font-medium flex flex-col gap-0.5 text-right">
          {{ deliveryMethod.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          <span class="text-gray-500 text-xs">{{ deliveryMethod.type }}</span>
        </dd>
      </div>
      <div class="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt class="text-base font-medium">Total</dt>
        <dd class="text-base font-medium text-gray-900">{{ total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</dd>
      </div>
    </dl>

    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
      <SfButton @click="placeOrder" class="w-full">Place Order</SfButton>
    </div>
  </div>
  <p v-if="paymentSuccess">Payment successful! Transaction ID: {{ transactionId }}</p>
  <p v-else-if="error">{{ error }}</p>
</template>

<script>
import { SfButton } from '@storefront-ui/vue';
import { useCheckoutStore } from '~/stores/checkout';

export default {
  components: { SfButton },
  props: {
    shippingDetails: Object,
  },
  setup() {
    const checkOutStore = useCheckoutStore();
    return {
      checkOutStore: checkOutStore,
      paymentSuccess: checkOutStore.paymentSuccess,
      transactionId: checkOutStore.transactionId,
      error: checkOutStore.error,
    };
  },
  computed: {
    subtotal() {
      return this.checkOutStore.subtotal;
    },
    total() {
      return this.checkOutStore.total;
    },
    deliveryMethod() {
      return this.checkOutStore.deliveryMethod;
    }
  },
  methods: {
    placeOrder() {
      this.processPayment();
      console.log('Order placed successfully!');
    },
  },
};
</script>
