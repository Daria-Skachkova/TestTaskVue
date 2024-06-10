<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { RouteNames } from '@/contants/router'

const { userInfo } = storeToRefs(useUserStore())

const route = useRoute()
</script>

<template>
  <header class="header">
    <div v-if="route.name !== RouteNames.LOGIN && userInfo" class="header__user">
      <h3>{{ userInfo.username }}</h3>
      <h3>{{ userInfo.phone }}</h3>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .header {
    height: 60px;
    width: 100%;
    padding: 0 2vw;
    background-color: $color-grey-04;

    &__user {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2vw;
      color: $color-grey-01;
    }
  }
</style>