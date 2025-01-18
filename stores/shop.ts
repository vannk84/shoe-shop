import { defineStore } from "pinia";
import type { Product, Category, CartItem } from "~/types";

export const useShopStore = defineStore("shop", {
  state: () => ({
    products: [] as Product[],
    categories: [] as Category[],
    cart: [] as CartItem[],
    loading: false, 
  }),
  
  getters: {
    cartItemCount: (state) => state.cart.length,
  },

  actions: {
    async fetchProducts() {
      this.setLoading(true);
      const data = await $fetch<Product[]>("/api/products");
      this.products = data;
      this.setLoading(false);
    },
    
    async fetchCategories() {
      this.setLoading(true);
      const data = await $fetch<Category[]>("/api/categories");
      this.categories = data;
      this.setLoading(false);
    },

    async fetchCart() {
      this.setLoading(true);
      const data = await $fetch<CartItem[]>("/api/cart");
      this.cart = data;
      this.setLoading(false);
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

    setLoading(loading: boolean) {
      this.loading= loading;
    },
  },
});
