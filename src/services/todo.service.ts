import type { NewTodo, TodosResponse, CreateTodoResponse } from '@/types/todo'

import { httpGet, httpPost } from '@/services/http.service'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTodos = async (): Promise<TodosResponse> => {
  return httpGet(TODOS_URL)
}

export const createNewTodo = async (params: NewTodo): Promise<CreateTodoResponse> => {
  return httpPost(TODOS_URL, params)
}