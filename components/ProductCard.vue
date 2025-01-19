<template>
  <div class="w-full border border-neutral-200 rounded-md hover:shadow-lg">
    <div class="relative">
      <SfLink href="#" class="block flex items-center justify-center">
        <img
          :src="product.image"
          alt="Great product"
          class="w-full block object-cover h-auto rounded-t aspect-square"
        />
      </SfLink>
      <SfButton
        variant="tertiary"
        size="sm"
        square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite size="sm" />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink href="#" variant="secondary" class="no-underline">{{ product.name }}</SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" :value="5" :max="5" />

        <SfLink href="#" variant="secondary" class="pl-1 no-underline">
          <SfCounter size="xs">123</SfCounter>
        </SfLink>
      </div>
      <p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
        {{ product.description }}
      </p>
      <span class="block pb-2 font-bold typography-text-lg">{{ product.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
      <SfButton size="sm" @click="handleAddToCart">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SfButton, SfCounter, SfIconFavorite, SfIconShoppingCart, SfLink, SfRating } from '@storefront-ui/vue';
  import { useShopStore } from '~/stores/shop';
  import type { Product } from '~/types';

  const props = defineProps<{
    product: Product;
  }>();
  
  const shopStore = useShopStore();

  const handleAddToCart = () => {
    shopStore.addToCart(props.product);
  };
</script>