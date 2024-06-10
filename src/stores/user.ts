import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InfoList, User } from '@/types/user'
import { LocalStorageKeys } from '@/contants/local-storage'
import { getFromLocalStorage, saveToLocalStorage } from '@/services/local-storage.service'

export const useUserStore = defineStore('user', () => {
  const usersList = ref<User[]>([])
  const userInfo = ref<User | null>(getFromLocalStorage<User>(LocalStorageKeys.USER_INFO))

  const generalUserInfo = computed<InfoList | null>(() => {
    return (userInfo.value) ?
      {
        id: userInfo.value.id,
        name: userInfo.value.name,
        username: userInfo.value.username
      } : null
  })
  const contactUserInfo = computed<InfoList | null>(() => {
    return (userInfo.value) ? {
      email: userInfo.value.email,
      phone: userInfo.value.phone,
      website: userInfo.value.website
    } : null
  })
  const addressUserInfo = computed<InfoList | null>(() => {
    return (userInfo.value) ? {
      street: userInfo.value.address.street,
      suite: userInfo.value.address.suite,
      city: userInfo.value.address.city,
      zipcode: userInfo.value.address.zipcode,
      lat: userInfo.value.address.geo.lat,
      lng: userInfo.value.address.geo.lng
    } : null
  })
  const companyUserInfo = computed<InfoList | null>(() => {
    return (userInfo.value) ? {
      name: userInfo.value.company.name,
      'catch phrase': userInfo.value.company.catchPhrase,
      bs: userInfo.value.company.bs
    } : null
  })

  const setUserInfo = (info: User): void => {
    userInfo.value = info
    saveToLocalStorage(LocalStorageKeys.USER_INFO, info)
  }

  return {
    userInfo,
    usersList,
    generalUserInfo,
    contactUserInfo,
    addressUserInfo,
    companyUserInfo,
    setUserInfo
  }
})
