<template>
  <div class="bg-white p-4 shadow rounded-lg">
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
    </div>
    <div v-else>
      <h1>Shopping Cart</h1>
      <div class="w-full flex flex-cols items-start flex-wrap gap-8 mt-12">
        <table class="w-full bg-white flex-[1_0_800px] p-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Product</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Quantity</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.product.id">
              <td class="p-4 border-t">
                <div class="flex items-center gap-4">
                  <img :src="item.product.image" :alt="item.product.name"
                    class="aspect-square max-w-[100px] object-contain" />
                  <div class="item-details">
                    <h2>{{ item.product.name }}</h2>
                    <p class="max-w-[200px]">{{ item.product.description }}</p>
                  </div>
                </div>
              </td>
              <td class="text-right p-4 border-t">${{ item.product.price }}</td>
              <td class="max-w-[150px] p-4 border-t">
                <div class="flex">
                  <SfButton :square="true" variant="secondary" @click="decreaseQuantity(item.product.id)"
                    class="rounded-none border border-r-0 !shadow-none !ring-0 h-[40px]">
                    <SfIconRemove />
                  </SfButton>
                  <SfInput aria-label="Label size base" type="number" v-model="item.quantity" min="1"
                    @change="updateQuantity(item.productId, item.quantity)" wrapperClass="rounded-none border !shadow-none !ring-0 max-w-[80px] overflow-hidden" />
                  <SfButton :square="true" variant="secondary" @click="increaseQuantity(item.product.id)"
                    class="rounded-none border border-l-0 !shadow-none !ring-0 h-[40px]">
                    <SfIconAdd />
                  </SfButton>
                </div>
              </td>
              <td class="p-4 border-t">
                <SfButton :square="true" variant="tertiary" aria-label="Remove" @click="removeFromCart(item.product.id)"
                  class="text-red-500 hover:text-red-400 hover:bg-transparent">
                  <SfIconDelete />
                </SfButton>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-gray-50 border flex-[1_0_200px] p-4 rounded-lg">
          <h2 class="text-lg font-medium ">Summary</h2>
          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Total Items</dt>
              <dd class="text-sm font-medium ">{{ totalItems }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Order Total</dt>
              <dd class="text-sm font-medium ">
                {{ total?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
              </dd>
            </div>
          </dl>
          <div class="mt-6">
            <SfButton @click="checkout" class="w-full">Checkout</SfButton>
            <div class="mt-6 text-center text-sm">
              or
              <router-link to="/products" class="font-medium text-indigo-600 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useShopStore } from '~/stores/shop';

export default {
  setup() {
    const shopStore = useShopStore();
    return { shopStore };
  },
  computed: {
    cartItems() {
      return this.shopStore.cart;
    },
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    total() {
      return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  },
  methods: {
    removeFromCart(productId) {
      this.shopStore.removeFromCart(productId);
    },
    updateQuantity(productId, quantity) {
      this.shopStore.updateCartQuantity(productId, quantity);
    },
    increaseQuantity(productId) {
      this.shopStore.increaseQuantity(productId);
    },
    decreaseQuantity(productId) {
      this.shopStore.decreaseQuantity(productId);
    },
    checkout() {
      this.$router.push('/checkout');
    }
  }
};
</script>
