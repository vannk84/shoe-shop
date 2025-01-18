<script setup lang="ts">
  import { onMounted } from "vue";
  import { useShopStore } from "~/stores/shop";

  const shopStore = useShopStore();

  onMounted(async () => {
    await shopStore.fetchProducts();
  });
</script>

<template>
  <div>
    <SfLoaderCircular v-if="shopStore.loadingProducts" size="2xl" />
    <ul v-else class="flex flex-wrap gap-4">
      <li v-for="product in shopStore.products" :key="product.id" class="flex-[1_0_250px]">
        <ProductItem :product="product" />
      </li>
    </ul>
  </div>
</template>
