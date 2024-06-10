<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { storeToRefs } from 'pinia'
import { STATUSES } from '@/contants/todo'
import AppSelect from '@/components/ui-kit/AppSelect.vue'
import AppInput from '@/components/ui-kit/AppInput.vue'
import AppTodoForm from '@/components/AppTodoForm.vue'
import AppButton from '@/components/ui-kit/AppButton.vue'

const todoStore = useTodoStore()
const { filters, userIdsAsOptions } = storeToRefs(todoStore)

const isModalOpened = ref<boolean>(false)

const toggleModal = (isOpen: boolean): void => {
  isModalOpened.value = isOpen
}
</script>

<template>
  <div class="todo-filters">
    <AppSelect
      v-model="filters.status"
      :options="STATUSES"
    />
    <AppSelect
      v-model="filters.id"
      :options="userIdsAsOptions"
    />
    <AppInput v-model="filters.search"
              placeholder="search"
              class="todo-filters__search"
    />
    <AppButton
      title="Create todo"
      class="button todo-filters__button"
      @click="toggleModal(true)"
    />

    <AppTodoForm v-model:is-opened="isModalOpened" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.todo-filters {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  gap: 2vw;
  margin-bottom: 30px;

  &__search {
    min-width: 180px;
    :deep(input) {
      padding: 12.5px 1em !important;

      &:focus{
        outline-color: $color-success;
      }
    }
  }

  &__button {
    height: 47px;
    width: 130px;
    place-self: end;
    padding: 0 1em;
  }
}

@media (max-width: 768px) {
  .todo-filters {
    grid-template-rows: auto;
    grid-template-columns: repeat(3, 1fr);
    &__button {
      width: 100%;
      margin-top: calc(30px - 2vw);
      grid-column: 1/4;
    }
  }
}
@media (max-width: 650px) {
  .todo-filters {
    grid-template-columns: 1fr;
    &__button {
      grid-column: 1;
    }
  }
}
</style>