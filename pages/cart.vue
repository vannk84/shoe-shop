<template>
  <Paper>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
    </div>
    <div v-else>
      <h2>Shopping Cart</h2>
      <div class="w-full flex flex-cols items-start flex-wrap gap-8 mt-12">
        <table class="w-full bg-white lg:flex-[1_0_800px] p-4">
          <thead>
            <tr>
              <th class="px-4 py-2">Product</th>
              <th class="hidden lg:table-cell px-4 py-2">Price</th>
              <th class="hidden lg:table-cell px-4 py-2">Quantity</th>
              <th class="hidden lg:table-cell px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.product.id">
              <td class="relative p-4 border-t">
                <SfButton variant="tertiary" aria-label="Remove" @click="removeFromCart(item.product.id)"
                  class="lg:hidden absolute right-0 top-0 text-red-500 hover:text-red-400 hover:bg-transparent">
                  <SfIconDelete />
                </SfButton>

                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-4">
                    <img :src="item.product.image" :alt="item.product.name"
                      class="aspect-square max-w-[100px] object-contain" />
                    <div class="item-details">
                      <h3>{{ item.product.name }}</h3>
                      <p class="max-w-[200px] text-secondary">{{ item.product.description }}</p>
                    </div>
                  </div>
                  <dl class="lg:hidden flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                      <dt class="text-gray-400">Price:</dt>
                      <dd class="truncate text-gray-900">
                        {{ item.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
                      </dd>
                    </div>
                    <div class="flex items-center gap-4">
                      <dt class="text-gray-400">Quantity:</dt>
                      <dd class="truncate text-gray-900">
                        <div class="flex">
                          <SfButton :square="true" variant="secondary" @click="decreaseQuantity(item.product.id)"
                            class="rounded-none border border-r-0 !shadow-none !ring-0 h-[40px]">
                            <SfIconRemove />
                          </SfButton>
                          <SfInput aria-label="Label size base" type="number" v-model="item.quantity" min="1"
                            @change="updateQuantity(item.product.id, Number($event.target.value))"
                            wrapperClass="rounded-none border !shadow-none !ring-0 max-w-[80px] overflow-hidden" />
                          <SfButton :square="true" variant="secondary" @click="increaseQuantity(item.product.id)"
                            class="rounded-none border border-l-0 !shadow-none !ring-0 h-[40px]">
                            <SfIconAdd />
                          </SfButton>
                        </div>
                      </dd>
                    </div>
                    <div class="flex items-center gap-2">
                      <dd class="w-full text-right truncate text-gray-900">
                        <SfButton variant="tertiary" aria-label="Remove" @click="removeFromCart(item.product.id)"
                          class="text-red-500 hover:text-red-400 hover:bg-transparent">
                          <SfIconDelete />
                        </SfButton>
                      </dd>
                    </div>
                  </dl>
                </div>
              </td>
              <td class="hidden lg:table-cell text-right p-4 border-t">
                {{ item.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
              </td>
              <td class="hidden lg:table-cell max-w-[150px] p-4 border-t">
                <div class="flex">
                  <SfButton :square="true" variant="secondary" @click="decreaseQuantity(item.product.id)"
                    class="rounded-none border border-r-0 !shadow-none !ring-0 h-[40px]">
                    <SfIconRemove />
                  </SfButton>
                  <SfInput aria-label="Label size base" type="number" v-model="item.quantity" min="1"
                    @change="updateQuantity(item.product.id, Number($event.target.value))"
                    wrapperClass="rounded-none border !shadow-none !ring-0 max-w-[80px] overflow-hidden" />
                  <SfButton :square="true" variant="secondary" @click="increaseQuantity(item.product.id)"
                    class="rounded-none border border-l-0 !shadow-none !ring-0 h-[40px]">
                    <SfIconAdd />
                  </SfButton>
                </div>
              </td>
              <td class="hidden lg:table-cell p-4 border-t">
                <SfButton :square="true" variant="tertiary" aria-label="Remove" @click="removeFromCart(item.product.id)"
                  class="text-red-500 hover:text-red-400 hover:bg-transparent">
                  <SfIconDelete />
                </SfButton>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-gray-50 border flex-[1_0_200px] p-4 rounded-lg">
          <h2 class="text-lg font-medium">Summary</h2>
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
  </Paper>
</template>

<script>
import { useCartStore } from '~/stores/cart';

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  computed: {
    cartItems() {
      return this.cartStore.cart;
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
      this.cartStore.removeFromCart(productId);
    },
    updateQuantity(productId, quantity) {
      this.cartStore.updateCartQuantity(productId, quantity);
    },
    increaseQuantity(productId) {
      this.cartStore.increaseQuantity(productId);
    },
    decreaseQuantity(productId) {
      this.cartStore.decreaseQuantity(productId);
    },
    checkout() {
      this.$router.push('/checkout');
    }
  }
};
</script>
