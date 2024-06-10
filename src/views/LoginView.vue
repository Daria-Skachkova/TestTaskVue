<script setup lang="ts">
import AppLoginForm from '@/components/AppLoginForm.vue'
</script>

<template>
  <section class="login-page">
    <AppLoginForm/>
  </section>
</template>

<style scoped lang="scss">
  .login-page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5vw;
  }
</style>