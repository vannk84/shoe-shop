<script setup lang="ts">
  import { onMounted } from "vue";
  import { useShopStore } from "~/stores/shop";

  const shopStore = useShopStore();

  onMounted(async () => {
    await shopStore.fetchProducts();
  });
</script>

<template>
  <div class="bg-white p-4 shadow rounded-lg">
    <div v-if="shopStore.loadingProducts" class="flex items-center justify-center w-full mt-32">
      <SfLoaderCircular size="2xl" />
    </div>
    <ul v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <li v-for="product in shopStore.products" :key="product.id">
        <ProductCard :product="product" />
      </li>
    </ul>
  </div>
</template>
