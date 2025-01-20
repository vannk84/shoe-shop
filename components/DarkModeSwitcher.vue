<template>
  <SfButton
    class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative group"
    aria-label="Log in"
    variant="tertiary"
    square
    @click="toggleTheme"
  >
    Toggle Theme ({{ theme }})
  </SfButton>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>
