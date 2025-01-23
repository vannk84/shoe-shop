<template>
  <div class="w-full h-full flex flex-col justify-between border rounded-md hover:shadow-lg transition-shadow">
    <div class="relative border-b">
      <router-link :to="`/products/${product.id}`"
        class="flex items-center justify-center rounded-t-md overflow-hidden">
        <img :src="product.image" alt="Great product"
          class="w-full block object-cover h-auto rounded-t-sm aspect-square transform transition-transform duration-1000 hover:scale-125" />
      </router-link>
    </div>
    <div class="h-full p-4  flex flex-col gap-4 justify-between">
      <div>
        <router-link :to="`/products/${product.id}`" variant="secondary"
          class="no-underline">{{ product.name }}</router-link>
        <div class="flex items-center pt-1">
          <SfRating size="xs" :value="5" :max="5" />

          <router-link :to="`/products/${product.id}`" variant="secondary" class="pl-1 no-underline">
            <SfCounter size="xs">123</SfCounter>
          </router-link>
        </div>
        <p class="py-2 line-clamp-3">
          {{ product.description }}
        </p>
      </div>
      <div>
        <span
          class="block pb-2 font-bold typography-text-lg">{{ product.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
        <SfButton size="sm" @click="handleAddToCart">
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          Add to cart
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfButton, SfCounter, SfIconShoppingCart, SfLink, SfRating } from '@storefront-ui/vue';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/types';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const handleAddToCart = () => {
  cartStore.addToCart(props.product);
};
</script>