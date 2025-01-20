<template>
  <Paper>
    <fieldset>
      <legend class="text-lg font-medium ">Delivery method</legend>
      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <label 
          v-for="method in deliveryMethods" 
          :key="method.type" 
          :aria-label="method.type" 
          :aria-description="`${method.description} for $${method.price}`" 
          :class="{'outline outline-primary-700': method.type === checkoutStore.deliveryMethod.type}" 
          class="relative border -outline-offset-2 flex cursor-pointer rounded-lg bg-white hover:outline hover:bg-primary-100 hover:outline-primary-700 p-4 focus:outline-none transition-color"
        >
          <input type="radio" name="delivery-method" :value="method.type" class="sr-only" @change="updateDeliveryMethod(method.type, method.price)" :checked="method.type === checkoutStore.deliveryMethod.type">
          <span class="flex flex-1">
            <span class="flex flex-col">
              <span class="block text-sm font-medium ">{{ method.type }}</span>
              <span class="mt-1 flex items-center text-sm text-secondary">{{ method.description }}</span>
              <span class="mt-6 text-sm font-medium ">${{ method.price }}</span>
            </span>
          </span>
          <svg 
          :class="{'!text-orange-700': method.type === checkoutStore.deliveryMethod.type}" 
           class="size-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
          </svg>
        </label>
      </div>
    </fieldset>
  </Paper>
</template>

<script setup>
import { useCheckoutStore } from '~/stores/checkout';

const deliveryMethods = [
  { type: 'Standard', price: 5.00, description: '4-10 business days' },
  { type: 'Express', price: 16.00, description: '2-5 business days' }
];

const checkoutStore = useCheckoutStore();

function updateDeliveryMethod(type, price) {
  checkoutStore.setDeliveryMethod(type, price);
}
</script>