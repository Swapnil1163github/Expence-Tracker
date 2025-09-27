import React, { useEffect, useMemo, useState } from 'react'
import { Container, CssBaseline, Divider, IconButton, Snackbar, Stack, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Expense, Summary as SummaryType, createExpense, deleteExpense, fetchExpenses, fetchSummary, updateExpense } from './api'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseTable } from './components/ExpenseTable'
import { Summary } from './components/Summary'
import { EditDialog } from './components/EditDialog'
import { Filters } from './components/Filters'

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [summary, setSummary] = useState<SummaryType | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editTarget, setEditTarget] = useState<Expense | null>(null)
  const [cats, setCats] = useState<string[]>(['Food', 'Travel', 'Shopping', 'Utilities', 'Other'])
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')

  async function load() {
    try {
      setLoading(true)
      const [ex, sum] = await Promise.all([
        fetchExpenses(),
        fetchSummary(),
      ])
      setExpenses(ex)
      setSummary(sum)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    if (!filterFrom && !filterTo) return expenses
    return expenses.filter(e => {
      const d = e.date
      if (filterFrom && d < filterFrom) return false
      if (filterTo && d > filterTo) return false
      return true
    })
  }, [expenses, filterFrom, filterTo])

  async function handleAdd(values: { amount: number; category: string; date: string }) {
    try {
      await createExpense(values)
      await load()
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? e?.message ?? 'Failed to add expense')
    }
  }

  async function handleSaveEdit(changes: { amount: number; category: string; date: string }) {
    if (!editTarget) return
    try {
      await updateExpense(editTarget.id, changes)
      setEditTarget(null)
      await load()
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? e?.message ?? 'Failed to update expense')
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteExpense(id)
      await load()
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? e?.message ?? 'Failed to delete expense')
    }
  }

  function handleAddCategory(name: string) {
    setCats(prev => Array.from(new Set([...prev, name])))
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h4">Expense Tracker</Typography>
          <IconButton onClick={load} aria-label="refresh" disabled={loading}><RefreshIcon /></IconButton>
        </Stack>

        <ExpenseForm onSubmit={handleAdd} categories={cats} onAddCategory={handleAddCategory} />

        <Divider sx={{ my: 3 }} />

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h6">Filters</Typography>
          <Filters from={filterFrom} to={filterTo} onChange={({ from, to }) => { setFilterFrom(from); setFilterTo(to) }} />
        </Stack>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Summary summary={summary} />
        </Stack>

        <ExpenseTable items={filtered} onEdit={setEditTarget} onDelete={handleDelete} />

        <EditDialog open={!!editTarget} expense={editTarget} categories={cats} onClose={() => setEditTarget(null)} onSave={handleSaveEdit} />

        <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)} message={error ?? ''} />
      </Container>
    </>
  )
}
