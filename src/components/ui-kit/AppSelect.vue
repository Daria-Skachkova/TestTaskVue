<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import type { Option, OptionValue } from '@/types'

const props = withDefaults(
  defineProps<{
    options: Option[]
    default?: string | number | null
  }>(),
  {
    default: null
  }
)

const modelValue = defineModel<OptionValue>({ required: true })

const isOpen = ref(false)

const selectedLabel = computed<string>(() => {
  return props.options.find((option: Option) => option.value === modelValue.value)?.label ?? ''
})

const toggleOpen = (): void => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option): void => {
  modelValue.value = option.value
  isOpen.value = false
}
</script>

<template>
  <div class="select"
       tabindex="0"
       @blur="isOpen = false"
  >
    <div class="select__selected"
         :class="{ 'select__selected_open': isOpen }"
         @click="toggleOpen"
    >
      {{ selectedLabel }}
    </div>
    <div class="select__items"
         :class="{ 'select__items_hidden': !isOpen }"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="select__item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.select {
  position: relative;
  min-width: 180px;
  height: 45px;
  line-height: 45px;

  &__selected {
    position: relative;
    padding-left: 1em;
    border-radius: 5px;
    border: 1px solid $color-grey-02;
    background-color: $color-grey-03;
    user-select: none;
    cursor: pointer;
    color: $color-white;

    &_open {
      border-color: $color-success;
      border-radius: 5px 5px 0 0;
    }

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      right: 17px;
      border: 5px solid transparent;
      border-top-color: $color-white;
    }
  }

  &__items {
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    z-index: 1;
    color: $color-white;
    border-radius: 0 0 5px 5px;
    border: 1px solid $color-success;
    border-bottom: none;
    background-color: $color-grey-03;

    &_hidden {
      display: none;
    }
  }

  &__item {
    padding-left: 1em;
    color: $color-white;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: $color-success;
    }
  }
}
</style>
