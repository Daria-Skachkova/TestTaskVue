<template>
  <div class="card">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .card {
    padding: 20px;
    border-radius: 16px;
    background-color: $color-grey-02;
    color: $color-text;
  }
</style>