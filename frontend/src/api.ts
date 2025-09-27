import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export type Expense = {
  id: string
  amount: number
  category: string
  date: string
}

export type ExpenseCreate = {
  amount: number
  category: string
  date: string
}

export type ExpenseUpdate = Partial<ExpenseCreate>

export type Summary = {
  total: number
  by_category: Record<string, number>
}

export async function fetchExpenses(date?: string) {
  const resp = await api.get<Expense[]>('/expenses', { params: { date } })
  return resp.data
}

export async function fetchSummary() {
  const resp = await api.get<Summary>('/expenses/summary')
  return resp.data
}

export async function createExpense(payload: ExpenseCreate) {
  const resp = await api.post<Expense>('/expenses', payload)
  return resp.data
}

export async function updateExpense(id: string, payload: ExpenseUpdate) {
  const resp = await api.put<Expense>(`/expenses/${id}`, payload)
  return resp.data
}

export async function deleteExpense(id: string) {
  await api.delete(`/expenses/${id}`)
}
