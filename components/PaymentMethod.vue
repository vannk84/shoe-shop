<template>
  <Paper>
    <h2 >Payment method</h2>
    <fieldset class="mt-4">
      <div class="grid grid-cols-2 gap-4 items-stretch">
        <label v-for="{ label, value, logo, active, selected } in paymentMethods" :key="value" class="relative">
          <input type="radio" name="payment_method" class="peer sr-only" :value="value" :disabled="!active"
            :checked="selected" />
          <div
            class="h-full flex flex-col items-center justify-center py-7 px-4 cursor-pointer rounded-md border -outline-offset-2 hover:border-primary-200 hover:bg-primary-100 peer-focus:border-primary-200 peer-focus:bg-primary-100 active:border-primary-300 active:bg-primary-200 peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary-700 peer-disabled:opacity-50 peer-disabled:bg-neutral-100 peer-disabled: peer-disabled:cursor-not-allowed peer-disabled:[&_img]:grayscale">
            <img :src="logo" :alt="label" class="h-6 select-none" />
            <p v-if="!active" class="absolute bottom-2 select-none text-disabled-900 typography-text-xs">Coming soon</p>
          </div>
        </label>
      </div>
    </fieldset>
    <hr class="my-8 " />
    <div class="mt-12 ">
      <div class="flex flex-wrap gap-4 max-w-[600px]">
        <div class="flex-[1_0_300px]">
          <label class="w-full flex flex-col gap-0.5 text-secondary">
            <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">
              Card number
              (<span class="text-xs text-secondary">4111111111111111</span>)
            </span>
            <SfInput v-model="paymentDetails.cardNumber" @input="updatePaymentDetails('cardNumber', $event.target.value)" label="Card Number" autocomplete="cc-number"
              placeholder="4111111111111111" />
          </label>
        </div>
  
        <div class="flex-[1_0_300px]">
          <label class="w-full flex flex-col gap-0.5 text-secondary">
            <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">Name on card</span>
            <SfInput v-model="paymentDetails.cardName" @input="updatePaymentDetails('cardName', $event.target.value)" label="Name on card" autocomplete="cc-name" />
          </label>
        </div>
  
        <div class="flex-[1_0_300px]">
          <label class="w-full flex flex-col gap-0.5 text-secondary">
            <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">Expiration date (MM/YYYY)</span>
            <SfInput v-model="paymentDetails.expiryDate" @input="updatePaymentDetails('expiryDate', $event.target.value)" label="Expiry Date" autocomplete="cc-exp" />
          </label>
        </div>
  
        <div class="flex-[1_0_100px]">
          <label class="w-full flex flex-col gap-0.5 text-secondary">
            <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">CVC</span>
            <SfInput v-model="paymentDetails.cvv" @input="updatePaymentDetails('cvv', $event.target.value)" label="CVV" autocomplete="csc" />
          </label>
        </div>
      </div>
    </div>
  </Paper>
</template>

<script>
import { SfButton, SfInput } from '@storefront-ui/vue';
import { useCheckoutStore } from '~/stores/checkout';

const paymentMethods = [
  {
    label: 'Credit card',
    value: 'credit-card',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/visa-logo.svg',
    active: true,
    selected: true
  },
  {
    label: 'PayPal',
    value: 'paypal',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/paypal-logo.svg',
    active: false,
  },
  {
    label: 'ApplePay',
    value: 'applepay',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/apple-pay-logo.svg',
    active: false,
  },
  {
    label: 'GooglePay',
    value: 'googlepay',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/google-pay-logo.svg',
    active: false,
  },
];

export default {
  components: { SfInput, SfButton },
  setup() {
    const shopStore = useCheckoutStore();
    const updatePaymentDetails = (field, value) => {
      shopStore.updatePaymentDetails({ [field]: value });
    };
    return {
      paymentDetails: shopStore.paymentDetails,
      paymentMethods,
      updatePaymentDetails
    };
  }
};
</script>
