<template>
  <form class="flex flex-wrap gap-8">
    <div class="flex-[1_0_300px]  lg:flex-[1_0_600px] flex flex-col gap-8">
      <ShippingDetails />
      <DeliveryMethod  />
      <PaymentMethod />
    </div>
    <div class="flex-[1_0_200px]">
      <OrderSummary />
    </div>
  </form>
</template>

<script>
  import ShippingDetails from '~/components/ShippingDetails.vue';
  import PaymentMethod from '~/components/PaymentMethod.vue';
  import OrderSummary from '~/components/OrderSummary.vue';
  import DeliveryMethod from '~/components/DeliveryMethod.vue';
  import { useCheckoutStore } from '~/stores/checkout';

  export default {
    components: {
      ShippingDetails,
      PaymentMethod,
      OrderSummary,
      DeliveryMethod
    },
    data() {
      return {
        currentStep: 0,
        steps: [
          { label: 'Shipping Details' },
          { label: 'Payment Method' },
          { label: 'Order Summary' },
        ],
      };
    },
    created() {
      const checkoutStore = useCheckoutStore();
      checkoutStore.fetchLineItems();
    },
  }
</script>
