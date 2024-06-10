<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo'
import type { NewTodo } from '@/types/todo'
import AppInput from '@/components/ui-kit/AppInput.vue'
import AppButton from '@/components/ui-kit/AppButton.vue'

const isOpened = defineModel('isOpened', { default: false })

const todoStore = useTodoStore()
const { isCreationLoading } = storeToRefs(todoStore)

const newTodo = reactive<NewTodo>({
  userId: null,
  title: ''
})

const clearForm = (): void => {
  newTodo.userId = null
  newTodo.title = ''
}

const closeModal = (): void => {
  isOpened.value = false
}

const addTodo = async (): Promise<void> => {
  const { error } =  await todoStore.createTodo(newTodo)

  if (!error) {
    clearForm()
    closeModal()
  } else {
    console.log('Error - Todo was not added')
  }
}
</script>

<template>
  <Teleport to="#app">
    <div v-if="isOpened"
         class="todo-form"
         tabindex="0"
         @click.self="closeModal"
    >
      <form @submit.prevent="addTodo"
            class="todo-form__content"
      >
        <h3 class="todo-form__title">Create todo</h3>
        <AppInput v-model="newTodo.userId"
                  name="todo-user"
                  placeholder="user id"
                  :disabled="isCreationLoading"
        />
        <AppInput v-model="newTodo.title"
                  name="todo-title"
                  placeholder="task title"
                  :disabled="isCreationLoading"
        />
        <AppButton type="submit"
                         title="Add"
                         class="button todo-form__button"
        />
      </form>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .todo-form {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(53, 53, 53, 0.65);
    &__content {
      width: 500px;
      max-width: 90vw;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 2vw;
      border-radius: 5px;
      background-color: $color-grey-02;
    }
    &__title {
      border-radius: 5px 5px 0 0;
      text-align: center;
      font-weight: 600;
      color: $color-text;
    }
    &__button {
      height: 40px;
    }
  }
</style>