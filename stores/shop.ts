import { defineStore } from "pinia";
import type { Product, Category, CartItem } from "~/types";

export const useShopStore = defineStore("shop", {
  state: () => ({
    products: [] as Product[],
    categories: [] as Category[],
    cart: [] as CartItem[],
    loadingProducts: false, 
  }),
  
  getters: {
    cartItemCount: (state) => state.cart.length,
  },

  actions: {
    async fetchProducts() {
      this.setLoadingProducts(true);
      const data = await $fetch<Product[]>("/api/products");
      this.products = data;
      this.setLoadingProducts(false);
    },
    
    async fetchCategories() {
      const data = await $fetch<Category[]>("/api/categories");
      this.categories = data;
    },

    async fetchCart() {
      const data = await $fetch<CartItem[]>("/api/cart");
      this.cart = data.map(item => ({
        ...item,
        subTotal: item.product.price * item.quantity
      }));
    },

    async fetchProductDetail(id: number) {
      const data = await $fetch<Product>(`/api/products/${id}`);
      return data;
    },

    addToCart(product: Product) {
      const existingItem = this.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.subTotal = existingItem.product.price * existingItem.quantity;
      } else {
        this.cart.push({ product, quantity: 1, subTotal: product.price });
      }
    },

    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.product.id !== productId);
    },

    updateCartQuantity(productId: number, quantity: number) {
      const cartItem = this.cart.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
        cartItem.subTotal = cartItem.product.price * quantity;
      }
    },

    increaseQuantity(productId: number) {
      const cartItem = this.cart.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity++;
        cartItem.subTotal = cartItem.product.price * cartItem.quantity;
      }
    },
    
    decreaseQuantity(productId: number) {
      const cartItem = this.cart.find((item) => item.product.id === productId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        cartItem.subTotal = cartItem.product.price * cartItem.quantity;
      }
    },

    setLoadingProducts(loading: boolean) {
      this.loadingProducts = loading;
    },

    clearCart() {
      this.cart = [];
    },
  },
});
