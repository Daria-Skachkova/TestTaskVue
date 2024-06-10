<script setup lang="ts">
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo'
import AppCard from '@/components/ui-kit/AppCard.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconTick from '@/components/icons/IconTick.vue'
import AppTodoFilters from '@/components/AppTodoFilters.vue'
import IconStarFilled from '@/components/icons/IconStarFilled.vue'

const todoStore = useTodoStore()
const { filteredTodoList, favoriteTodoIds } = storeToRefs(todoStore)

const toggleFavoriteTodo = (id: number): void => {
  todoStore.removeOrAddFavoriteTodo(id)
}

const getStarIcon = (id: number): Component => {
 return favoriteTodoIds.value.includes(id) ? IconStarFilled : IconStar
}

todoStore.getTodoList()
</script>

<template>
  <div class="todo">
    <AppTodoFilters/>
    <AppCard>
      <ul class="todo__list">
        <li v-for="todo in filteredTodoList"
            :key="todo.id"
            class="todo__item"
        >
          <IconTick v-if="todo.completed" class="todo__completed" />
          {{ todo.title }}
          <button class="todo__button"
                  @click="toggleFavoriteTodo(todo.id)"
          >
            <Component :is="getStarIcon(todo.id)" />
          </button>
        </li>
      </ul>
    </AppCard>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.todo {
  .card {
    padding-top: 0;
    padding-bottom: 0;
  }

  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    line-height: 100%;
    padding: 20px 20px 20px 40px;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid $color-grey-01;
    }
  }

  &__completed {
    position: absolute;
    top: calc(50% - 15px);
    left: 0;
  }
  &__button {
    background-color: transparent;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>