<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import eventBus from '~/utils/eventBus';

const router = useRouter();
const auth0 = useNuxtApp().$auth0;

onMounted(() => {
  router.beforeEach(async (to, from, next) => {
    eventBus.on('loginSuccess', () => {
      router.push(to);
    });

    const isAuthenticated = await auth0.isAuthenticated();
    if ((to.path === '/cart' || to.path === '/checkout') && !isAuthenticated) {
      await auth0.loginWithPopup();
    } else {
      next();
    }
  });
});
</script>
