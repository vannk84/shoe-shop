<template>
  <SfButton
    class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative"
    aria-label="Log in"
    variant="tertiary"
    square
    v-if="!isAuthenticated"
    @click="loginWithPopup"
  >
    <SfIconPerson/>
    <span class="hidden xl:inline-flex whitespace-nowrap">Log in</span>
  </SfButton>
  <SfButton
    class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative group"
    aria-label="Log in"
    variant="tertiary"
    square
    v-if="isAuthenticated"
    @click="logout"
  >
    <span class="text-red-500 group-hover:text-red-400"><SfIconLogout/></span>
    <span v-if="user" class="hidden xl:inline-flex whitespace-nowrap">{{ user.name }}</span>
  </SfButton>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import eventBus from '~/utils/eventBus';

export default defineComponent({
  setup() {
    const isAuthenticated = ref(false);
    const auth0 = useNuxtApp().$auth0;

    const user = computed(() => auth0.user);

    const loginWithPopup = async () => {
      await auth0.loginWithPopup();
    };

    const login = async () => {
      await auth0.login();
    };

    const logout = async () => {
      await auth0.logout();
      isAuthenticated.value = false;
      auth0.user = null;
    };

    const loadAuthState = async () => {
      eventBus.on('loginSuccess', ({ user: loggedInUser }) => {
        isAuthenticated.value = true;
        auth0.user = loggedInUser;
      });
      
      const storedAuth = auth0.loadFromStorage();
      if (storedAuth.isAuthenticated) {
        isAuthenticated.value = storedAuth.isAuthenticated;
        auth0.user = storedAuth.user;
      } 
    };

    onMounted(loadAuthState);

    return { login, loginWithPopup, logout, isAuthenticated, user };
  },
});
</script>