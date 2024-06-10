<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import AppList from '@/components/ui-kit/AppList.vue'

const {
  userInfo,
  generalUserInfo,
  contactUserInfo,
  addressUserInfo,
  companyUserInfo
} = storeToRefs(useUserStore())
</script>

<template>
  <div v-if="userInfo" class="user-info">
    <AppList
      v-if="generalUserInfo"
      :list="generalUserInfo"
      title="General"
    />
    <AppList
      v-if="contactUserInfo"
      :list="contactUserInfo"
      title="Contact"
    />
    <AppList
      v-if="addressUserInfo"
      :list="addressUserInfo"
      title="Address"
    />
    <AppList
      v-if="companyUserInfo"
      title="Company"
      :list="companyUserInfo"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .user-info {
    width: 100%;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(4, 1fr);
    gap: 2vw;
    row-gap: 30px;
  }

  @media (max-width: 1024px) {
    .user-info {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 650px) {
    .user-info {
      grid-template-columns: 1fr;
    }
  }
</style>