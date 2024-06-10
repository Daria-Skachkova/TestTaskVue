import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Option } from '@/types'
import type { CreateTodoResponse, NewTodo, NewTodoData, Todo } from '@/types/todo'
import { StatusValues } from '@/contants/todo'
import { LocalStorageKeys } from '@/contants/local-storage'
import { fetchTodos, createNewTodo } from '@/services/todo.service'
import { getFromLocalStorage, saveToLocalStorage } from '@/services/local-storage.service'

export const useTodoStore = defineStore('todo', () => {
  const isCreationLoading = ref<boolean>(false)
  const todoList = ref<Todo[]>([])
  const filters = reactive<{
    id: number | null
    search: string
    status: StatusValues
  }>({
    id: null,
    search: '',
    status: StatusValues.ALL
  })
  const favoriteTodoIds = ref<number[]>(getFromLocalStorage(LocalStorageKeys.FAVORITE_TODOS) || [])

  const filteredTodoList = computed<Todo[]>(() => {
    return todoList.value.filter((todo: Todo) => {
      const isValidId =  (filters.id) ? todo.userId === filters.id : true
      const isValidSearch = (filters.search) ? todo.title.includes(filters.search) : true
      let isValidStatus = true

      if (filters.status !== StatusValues.ALL) {
        switch(filters.status) {
          case StatusValues.COMPLETED: {
            isValidStatus = todo.completed
            break
          }
          case StatusValues.UNCOMPLETED: {
            isValidStatus = !todo.completed
            break
          }
          case StatusValues.FAVORITE: {
            isValidStatus = favoriteTodoIds.value.includes(todo.id)
            break
          }
        }
      }

      return isValidId && isValidSearch && isValidStatus
    })
  })

  const userIdsAsOptions = computed<Option[]>(() => {
    const nonUniqUserIds = todoList.value.map((todo: Todo): number => {
      return todo.userId
    })

    const userOptions = [...(new Set(nonUniqUserIds))].map((id: number): Option => {
      return {
        value: id,
        label: String(id)
      }
    })

    return [
      {value: null, label: 'All'},
      ...userOptions
    ]
  })

  const addTodoToList = (todo: NewTodoData): void => {
    todoList.value.push({
      ...todo,
      completed: false
    })
  }

  const removeOrAddFavoriteTodo = (todoId: number): void => {
    if (favoriteTodoIds.value.includes(todoId)) {
      favoriteTodoIds.value = favoriteTodoIds.value.filter(i => i !== todoId)
    } else {
      favoriteTodoIds.value = [...favoriteTodoIds.value, todoId]
    }

    saveToLocalStorage(LocalStorageKeys.FAVORITE_TODOS, favoriteTodoIds.value)
  }

  const getTodoList = async (): Promise<void> => {
    const { data, error } = await fetchTodos()

    if (!error) {
      todoList.value = data
    }
  }

  const createTodo = async (todo: NewTodo): Promise<CreateTodoResponse> => {
    isCreationLoading.value = true

    const response = await createNewTodo(todo)

    isCreationLoading.value = false

    if (!response.error) {
      addTodoToList(response.data)
    }

    return response
  }

  return {
    todoList,
    filters,
    favoriteTodoIds,
    userIdsAsOptions,
    filteredTodoList,
    isCreationLoading,
    createTodo,
    getTodoList,
    removeOrAddFavoriteTodo
  }
})