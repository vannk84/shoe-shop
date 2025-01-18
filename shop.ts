import { defineStore } from "pinia";
import type { Product, Category, CartItem } from "~/types";

export const useShopStore = defineStore("shop", {
  state: () => ({
    products: [] as Product[],
    categories: [] as Category[],
    cart: [] as CartItem[],
  }),
  actions: {
    async fetchProducts() {
      const data = await $fetch<Product[]>("/api/products");
      this.products = data;
    },
    async fetchCategories() {
      const data = await $fetch<Category[]>("/api/categories");
      this.categories = data;
    },
    async fetchCart() {
      const data = await $fetch<CartItem[]>("/api/cart");
      this.cart = data;
    },
    addToCart(productId: number) {
      const existingItem = this.cart.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ productId, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.productId !== productId);
    },
    updateCartQuantity(productId: number, quantity: number) {
      const cartItem = this.cart.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
  },
});

