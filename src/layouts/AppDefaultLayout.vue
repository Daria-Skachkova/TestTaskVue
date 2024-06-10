<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader/>
    <main>
      <slot/>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.default-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background-color: $color-grey-01;
}
</style>