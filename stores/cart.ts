import { defineStore } from "pinia";
import type { CartItem, Product } from "~/types";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as CartItem[],
  }),

  getters: {
    cartItemCount: (state) => state.cart.length,
  },

  actions: {
    async fetchCart() {
      const data = await $fetch<CartItem[]>("/api/cart");
      this.cart = data.map(item => ({
        ...item,
        subTotal: item.product.price * item.quantity
      }));
      this.saveCart();
    },

    addToCart(product: Product) {
      const existingItem = this.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.subTotal = existingItem.product.price * existingItem.quantity;
      } else {
        this.cart.push({ product, quantity: 1, subTotal: product.price });
      }
      this.saveCart();
    },

    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.product.id !== productId);
      this.saveCart();
    },

    updateCartQuantity(productId: number, quantity: number) {
      const cartItem = this.cart.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
        cartItem.subTotal = cartItem.product.price * cartItem.quantity;
      }
      this.saveCart();
    },

    increaseQuantity(productId: number) {
      const cartItem = this.cart.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity++;
        cartItem.subTotal = cartItem.product.price * cartItem.quantity;
      }
      this.saveCart();
    },

    decreaseQuantity(productId: number) {
      const cartItem = this.cart.find((item) => item.product.id === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        cartItem.subTotal = cartItem.product.price * cartItem.quantity;
      }
      this.saveCart();
    },

    clearCart() {
      this.cart = [];
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    }
  },
});

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const cartStore = useCartStore();
    cartStore.loadCart();
  });
}
