// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@storefront-ui/nuxt', 
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        loginCallback: process.env.AUTH0_LOGIN_CALLBACK,
        logoutCallback: process.env.AUTH0_LOGOUT_CALLBACK
      }
    }
  },
  plugins: ['~/plugins/auth0.ts'],
  typescript: {
    strict: true,
  }
})
