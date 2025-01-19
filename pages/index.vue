<script lang="ts">
import { defineComponent } from 'vue';
import Products from './products/index.vue'; 
import HomeCover from '@/components/HomeCover.vue'

export default defineComponent({
  components: {
    Products,
    HomeCover
  },
});
</script>

<template>
  <HomeCover/>
  <div class="z-10 relative">
    <Products />
  </div>
</template>
