<template>
  <div>
    <h1>Checkout</h1>
    <div v-if="cart.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cart" :key="item.productId">
          <span>{{ getProduct(item.productId)?.name || 'Unknown Product' }}</span>
          <span>Quantity: {{ item.quantity }}</span>
          <span>Price: {{ getProduct(item.productId) ? getProduct(item.productId).price * item.quantity : 0 }}</span>
        </li>
      </ul>
      <p>Total: {{ cartTotal }}</p>
      <button @click="checkout">Proceed to Checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopStore } from "~/stores/shop";

const shopStore = useShopStore();
const cart = shopStore.cart;

const getProduct = (productId: number) => {
  return shopStore.products.find(product => product.id === productId);
};

const cartTotal = computed(() => {
  return cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
});

const checkout = () => {
  // Implement checkout logic here
  alert("Proceeding to checkout...");
};
</script>
