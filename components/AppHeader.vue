<template>
  <header :class="{'drop-shadow-md': isScrolled}" class="fixed z-50 flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b transition-all">
    <div class="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
      <router-link
        to="/"
        aria-label="Homepage"
        class="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
      >
        <picture>
          <source srcset="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo.svg" media="(min-width: 768px)" />
          <img
            src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
            alt="Logo"
            class="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
          />
        </picture>
      </router-link>
      <SfButton aria-label="Open categories" class="lg:hidden order-first lg:order-1 mr-4" square variant="tertiary">
        <SfIconMenu />
      </SfButton>
      <router-link to="/products" class="lg:flex lg:mr-4">
        <SfButton type="button" variant="tertiary">
          <span class="hidden lg:flex whitespace-nowrap">Products</span>
        </SfButton>
      </router-link>
      <nav class="flex-1 flex justify-end lg:order-last lg:ml-4">
        <div class="flex flex-row flex-nowrap">
          <router-link to="/cart" class="lg:flex lg:mr-4">
            <SfButton
              class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700 relative"
              aria-label="Cart"
              variant="tertiary"
              square
            >
              <template #prefix>
                <Component :is="SfIconShoppingCart" />
              </template>
              <span
                v-if="cartItemCount > 0"
                class="inline-flex whitespace-nowrap text-red-500 text-md absolute top-0 right-0 -mt-1 -mr-3 px-2"
              >
                {{ cartItemCount }}
              </span>
            </SfButton>
          </router-link>
          <AuthButton />
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {
  SfButton,
  SfIconMenu,
  SfIconShoppingCart
} from '@storefront-ui/vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import AuthButton from './AuthButton.vue';

const cartStore = useCartStore();
const cartItemCount = computed(() => cartStore.cartItemCount);

const inputValue = ref('');

const search = () => {
  alert(`Successfully found 10 results for ${inputValue.value}`);
};

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 82;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  cartStore.loadCart();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

