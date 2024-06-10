<script setup lang="ts">
defineProps<{
  title: string
  list: Record<string, string | number>
}>()
</script>

<template>
  <div class="list">
    <h4>{{ title }}</h4>
    <ul v-if="list">
      <li v-for="(item, key) in list" :key="key">
        <b>{{ key }}:</b>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.list {
  display: flex;
  flex-direction: column;
  h4 {
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid $color-grey-04;
    text-align: center;
    font-weight: 600;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    li {
      display: grid;
      grid-template-columns: 30% 1fr;
      grid-auto-rows: 1fr;
      grid-column-gap: 5px;
      text-align: start;
      word-break: break-word;
      b {
        text-transform: capitalize;
      }
    }
  }
}
</style>