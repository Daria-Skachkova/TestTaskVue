<script setup lang="ts">
import { ref } from 'vue'
import type { ValidationRule } from '@/types/validation-rules'

interface InputProps {
  label?: string
  maxLength?: number
  rules?: ValidationRule[]
}

const props = withDefaults(
  defineProps<InputProps>(),
  {
    label: '',
    maxLength: 100,
    rules: () => []
  }
)

const modelValue = defineModel<string>({ default: '' })

const isValid = ref<boolean>(true)

const handleInput = (event: Event): void => {
  const input = event.target as HTMLInputElement | null
  const value = input?.value ?? ''

  if (props.rules.length) {
    isValid.value = props.rules.every((validator: ValidationRule): boolean => {
      return validator(value)
    })
  }

  if (isValid.value) {
    modelValue.value = value
  } else {
    if (input?.value) input.value = modelValue.value
  }
}
</script>

<template>
  <div class="input">
    <label v-if="label" class="input__label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :maxlength="maxLength"
      @input="handleInput"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.input {
  position: relative;
  width: 100%;

  &__label {
    display: block;
    margin-bottom: 5px;
    font-size: $font-size-smaller;
    color: $color-text-light;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: $color-white;
    color: $color-text;

    &::placeholder {
      text-transform: capitalize;
      color: $color-text;
    }
    &:focus {
      outline: 1px solid $color-grey-02;
    }
    &[disabled] {
      opacity: 0.6;
      cursor: auto;
    }
  }
}
</style>