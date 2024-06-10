<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="login-layout">
    <AppHeader/>
      <main>
        <slot/>
      </main>
    <AppFooter/>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .login-layout {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    background-color: $color-grey-03;
  }
</style>