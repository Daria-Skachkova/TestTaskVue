import type { HttpResponse } from '@/types//http'
export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export interface TodosResponse extends HttpResponse {
  data: Todo[]
}

export interface NewTodo {
  userId: number,
  title: string
}

export interface NewTodoData {
  id: number,
  title: string
  userId: number,
}

export interface CreateTodoResponse extends HttpResponse {
  data: NewTodoData
}