// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@storefront-ui/nuxt', '@pinia/nuxt'],
  typescript: {
    strict: true,
  }
})
