<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { RouteNames } from '@/contants/router'
import { fetchUsers } from '@/services/user.service'
import { validatePhone, validateUserName } from '@/utils/validation-rules'
import type { User, UserLoginData } from '@/types/user'
import AppInput from '@/components/ui-kit/AppInput.vue'
import AppButton from '@/components/ui-kit/AppButton.vue'

const router = useRouter()

const usersStore = useUserStore()

const isLoading = ref<boolean>(false)
const isLoginError = ref<boolean>(false)
const user = reactive<UserLoginData>({
  name: '',
  phone: ''
})

const clearLoginForm = () => {
  user.name = ''
  user.phone = ''
  isLoginError.value = false
}

const findUser = (users: User[]): User | null => {
  return users.find((info: User) => {
    return user.name === info.username && user.phone === info.phone
  }) || null
}

const login = async (): Promise<void> => {
  isLoading.value = true

  const { data, error } = await fetchUsers()

  isLoading.value = false

  if (!error) {
    const userInfo: User | null = findUser(data)

    if (userInfo) {
      usersStore.setUserInfo(userInfo)
      clearLoginForm()
      void router.push({name: RouteNames.HOME})
    } else {
      isLoginError.value = true
    }
  }
}
</script>

<template>
  <form @submit.prevent="login" class="login-form">
    <h4 class="login-form__title">
        description
    </h4>
    <p class="login-form__description">
      description
    </p>
    <div class="login-form__content">
      <div class="login-form__fields">
        <AppInput v-model="user.name"
                  :rules="[validateUserName]"
                  :disabled="isLoading"
                  name="username"
                  placeholder="username"
        />
        <AppInput v-model="user.phone"
                  :rules="[validatePhone]"
                  :disabled="isLoading"
                  type="tel"
                  name="phone"
                  placeholder="phone number"
        />
      </div>
      <AppButton
        type="submit"
        title="Register"
        class="button login-form__button"
      />
      <p v-if="isLoginError" class="login-form__error">
        Login error
      </p>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .login-form {
    width: 447px;
    max-width: calc(100vw - 40px);
    border-radius: 5px;
    background-color: $color-grey-01;
    color: $color-text-light;

    &__title {
      padding: 15px 0;
      border-radius: 5px 5px 0 0;
      text-align: center;
      background-color: $color-grey-02;
    }
    &__description {
      padding: 15px 25px;
      font-size: $font-size-smaller;
    }
    &__content {
      display: flex;
      flex-direction: column;
      gap: 25px;
      padding: 0 25px 30px 25px;
    }
    &__fields {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__button {
      width: 100%;
      padding: 10px 30px;
    }
    &__error {
      text-align: center;
      font-size: $font-size-smaller;
      color: $color-error;
    }
  }
</style>