<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import AppCard from '@/components/ui-kit/AppCard.vue'
import AppTodoList from '@/components/AppTodoList.vue'
import AppUserInfo from '@/components/AppUserInfo.vue'

const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <section class="home-page">
    <AppCard v-if="userInfo">
      <AppUserInfo :user="userInfo"/>
    </AppCard>
    <AppTodoList />
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 2vw;
}
</style>
