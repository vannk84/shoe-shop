<template>
  <SfButton
    class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative"
    aria-label="Log in"
    variant="tertiary"
    square
    v-if="!isAuthenticated"
    @click="login"
  >
    <SfIconPerson/>
    <span class="hidden xl:inline-flex whitespace-nowrap">Log in</span>
  </SfButton>
  <SfButton
    class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative"
    aria-label="Log in"
    variant="tertiary"
    square
    v-if="isAuthenticated"
    @click="logout"
  >
    <SfIconLogout/>
    <span v-if="user" class="hidden xl:inline-flex whitespace-nowrap">{{ user.name }}</span>
  </SfButton>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  SfButton,
  SfIconPerson,
  SfIconLogout,
} from '@storefront-ui/vue';

export default defineComponent({
  setup() {
    const isAuthenticated = ref(false);
    const user = ref(null);

    const auth0 = useNuxtApp().$auth0;

    const login = async () => {
      await auth0.login();
    };

    const logout = async () => {
      await auth0.logout();
      isAuthenticated.value = false;
      user.value = null;
    };

    const loadAuthState = async () => {
      const storedAuth = auth0.loadFromStorage();
      if (storedAuth.isAuthenticated) {
        isAuthenticated.value = storedAuth.isAuthenticated;
        user.value = storedAuth.user;
      } else if (window.location.search.includes('code=')) {
        await auth0.handleRedirectCallback();
        console.log({storedAuth});
        window.history.replaceState({}, document.title, window.location.pathname);
        isAuthenticated.value = true;
        user.value = await auth0.getUser();
      }
    };

    onMounted(loadAuthState);

    return { login, logout, isAuthenticated, user };
  },
});
</script>