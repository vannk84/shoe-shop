<template>
  <div class="w-full bg-white shadow rounded-lg">
    <div class="p-4">
      <h2 >Order Summary</h2>
    </div>
    <dl class="space-y-6 border-t  px-4 py-6 sm:px-6">
      <div class="flex items-center justify-between">
        <dt class="text-sm">Subtotal</dt>
        <dd class="text-sm font-medium ">
          {{ subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-sm">Shipping</dt>
        <dd class="text-sm font-medium flex flex-col gap-0.5 text-right">
          {{ deliveryMethod.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          <span class="text-secondary text-xs">{{ deliveryMethod.type }}</span>
        </dd>
      </div>
      <div class="flex items-center justify-between border-t  pt-6">
        <dt class="text-base font-medium">Total</dt>
        <dd class="text-base font-medium ">
          {{ total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </dd>
      </div>
    </dl>

    <div class="border-t px-4 py-6 sm:px-6">
      <SfButton @click="placeOrder" :disabled="!canPlaceOrder || processingPayment" class="w-full">
        <span v-if="processingPayment">
          <SfLoaderCircular />
        </span>
        <span>Place Order</span>
      </SfButton>
      <div class="mt-6 text-center text-sm">
        or
        <router-link to="/products" class="font-medium text-indigo-600 hover:text-indigo-500">
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
  <div v-if="paymentSuccess" role="alert"
    class="mt-4 flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md">
    <SfIconCheckCircle class="my-2 mr-2 text-positive-700 shrink-0" />
    <p class="py-2 mr-2">Payment successful! Transaction ID: {{ transactionId }}</p>
  </div>
  <div v-else-if="error" role="alert"
    class="mt-4 flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md">
    <p class="py-2 mr-2">{{ error }}</p>
  </div>
</template>

<script>
import { SfButton, SfLoaderCircular } from '@storefront-ui/vue';
import { useCheckoutStore } from '~/stores/checkout';

export default {
  components: { SfButton, SfLoaderCircular },
  props: {
    shippingDetails: Object,
  },
  setup() {
    const checkOutStore = useCheckoutStore();
    return {
      checkOutStore,
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
    },
    canPlaceOrder() {
      return this.checkOutStore.isShippingInfoComplete && this.checkOutStore.isPaymentDetailsComplete && this.checkOutStore.isDeliveryMethodComplete && this.subtotal > 0;
    },
    processingPayment() {
      return this.checkOutStore.processingPayment;
    },
    paymentSuccess() {
      return this.checkOutStore.paymentSuccess;
    },
    error() {
      return this.checkOutStore.error;
    },
    transactionId() {
      return this.checkOutStore.transactionId;
    },
  },
  methods: {
    async placeOrder() {
      await this.checkOutStore.processPayment();
    },
  },
};
</script>
