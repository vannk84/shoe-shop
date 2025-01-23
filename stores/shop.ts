import { defineStore } from "pinia";
import type { Product, Category } from "~/types";

export const useShopStore = defineStore("shop", {
  state: () => ({
    products: [] as Product[],
    categories: [] as Category[],
    loadingProducts: false, 
  }),
  
  getters: {
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

    async fetchProductDetail(id: number) {
      const data = await $fetch<Product>(`/api/products/${id}`);
      return data;
    },

    setLoadingProducts(loading: boolean) {
      this.loadingProducts = loading;
    },
  },
});
