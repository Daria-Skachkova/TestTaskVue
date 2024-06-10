<script setup lang="ts">
import { defineProps } from 'vue'

withDefaults(
  defineProps<{
    title: string,
  }>(),
  {
    title: ''
  }
)
</script>

<template>
  <button
    v-bind="$attrs"
    :title="title"
    class="button"
  >
    {{ title }}
  </button>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: $color-success;
  text-align: center;
  font-weight: 600;
  color: $color-white;
  transition: opacity 2ms;

  &:hover {
    opacity: 0.9;
  }
}
</style>