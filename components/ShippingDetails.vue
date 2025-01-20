<template>
  <Paper>
    <h2 >Shipping address</h2>
    <div class="flex gap-4 flex-wrap mt-4">
      <label class="w-full md:w-auto flex-grow flex flex-col gap-0.5 md:mt-0 text-secondary">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">First Name</span>
        <SfInput name="firstName" autocomplete="given-name" required v-model="shippingInfo.firstName" />
      </label>
      <label class="w-full md:w-auto flex-grow flex flex-col gap-0.5 text-secondary">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">Last Name</span>
        <SfInput name="lastName" autocomplete="family-name" required v-model="shippingInfo.lastName" />
      </label>
      <label class="w-full flex flex-col gap-0.5 text-secondary">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">Phone</span>
        <SfInput name="phone" type="tel" autocomplete="tel" required v-model="shippingInfo.phone" />
      </label>
      <div class="w-full md:w-auto flex-grow flex flex-wrap gap-4 flex-[1_0_100%]">
        <div class="flex flex-col gap-0.5 flex-[1_0_300px] lg:flex-[1_0_500px]">
          <label class="text-secondary">
            <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">Street</span>
            <SfInput name="street" autocomplete="address-line1" class="mt-0.5" required :invalid="!streetIsValid"
              @update:model-value="streetIsValid = !!$event" v-model="shippingInfo.street" />
          </label>
          <div class="flex flex-colr mt-0.5">
            <strong v-if="!streetIsValid" class="typography-error-sm text-negative-700 font-medium">
              Please provide a valid street name
            </strong>
            <small class="typography-hint-xs text-neutral-500">Street address or P.O. Box</small>
          </div>
        </div>
      </div>
      <label class="w-full flex flex-col gap-0.5 text-secondary flex-[1_0_200px]">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">Country</span>
        <SfSelect name="country" placeholder="-- Select --" autocomplete="country-name" required
          v-model="shippingInfo.country">
          <option v-for="countryName in countries" :key="countryName">{{ countryName }}</option>
        </SfSelect>
      </label>
      <label class="w-full flex flex-col gap-0.5 text-secondary flex-[1_0_200px]">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">City</span>
        <SfInput name="city" autocomplete="address-level2" required v-model="shippingInfo.city" />
      </label>
      <label class="w-full md:w-auto flex flex-col gap-0.5 flex-grow text-secondary flex-[1_0_200px]">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">State</span>
        <SfSelect name="state" placeholder="-- Select --" autocomplete="address-level1" required
          v-model="shippingInfo.state">
          <option v-for="stateName in states" :key="stateName">{{ stateName }}</option>
        </SfSelect>
      </label>
      <label class="w-full flex flex-col gap-0.5 md:w-[120px] text-secondary flex-[1_0_100px]">
        <span class="typography-text-sm font-medium after:content-['*'] after:text-red-500 after:ml-1">ZIP Code</span>
        <SfInput name="zipCode" placeholder="eg. 12345" autocomplete="postal-code" required
          v-model="shippingInfo.zipCode" />
      </label>
    </div>
  </Paper>
</template>

<script lang="ts">
import { SfButton, SfCheckbox, SfInput, SfSelect } from '@storefront-ui/vue';
import { defineComponent, ref, watch } from 'vue';
import { useCheckoutStore } from '~/stores/checkout';

const countries = ['Germany', 'Great Britain', 'Poland', 'United States of America'] as const;
const states = ['California', 'Florida', 'New York', 'Texas'] as const;

export default defineComponent({
  components: { SfInput, SfSelect, SfCheckbox, SfButton },
  setup() {
    const streetIsValid = ref(true);
    const checkOutStore = useCheckoutStore();
    const shippingInfo = ref(checkOutStore.getShippingInfo);

    watch(shippingInfo, (newInfo) => {
      checkOutStore.updateShippingInfo(newInfo);
    }, { deep: true });

    return {
      countries,
      states,
      streetIsValid,
      shippingInfo,
    };
  },
});
</script>
