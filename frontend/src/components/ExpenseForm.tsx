import React, { useMemo, useState } from 'react'
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

export type ExpenseFormValues = {
  amount: number
  category: string
  date: string
}

const DEFAULT_CATEGORIES = ['Food', 'Travel', 'Shopping', 'Utilities', 'Other']

export function ExpenseForm({ onSubmit, categories, onAddCategory }: {
  onSubmit: (values: ExpenseFormValues) => void
  categories?: string[]
  onAddCategory?: (name: string) => void
}) {
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<string>('Food')
  const [customCat, setCustomCat] = useState<string>('')
  const [date, setDate] = useState<Dayjs | null>(dayjs())

  const allCategories = useMemo(() => {
    const base = categories && categories.length > 0 ? Array.from(new Set([...DEFAULT_CATEGORIES, ...categories])) : DEFAULT_CATEGORIES
    return base.concat('Custom...')
  }, [categories])

  const canSubmit = amount.trim().length > 0 && !isNaN(Number(amount)) && Number(amount) > 0 && !!date

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let cat = category
    if (category === 'Custom...') {
      if (!customCat.trim()) return
      cat = customCat.trim()
      onAddCategory?.(cat)
    }

    onSubmit({
      amount: Number(amount),
      category: cat,
      date: (date ?? dayjs()).format('YYYY-MM-DD'),
    })
    setAmount('')
    setCustomCat('')
    setCategory('Food')
    setDate(dayjs())
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputProps={{ step: '0.01', min: '0.01' }}
            required
          />
          <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} sx={{ minWidth: 180 }}>
            {allCategories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          {category === 'Custom...' && (
            <TextField label="New Category" value={customCat} onChange={(e) => setCustomCat(e.target.value)} required />
          )}
          <DatePicker label="Date" value={date} onChange={(d) => setDate(d)} format="YYYY-MM-DD" />
          <Button type="submit" variant="contained">Add Expense</Button>
        </Stack>
      </LocalizationProvider>
    </Box>
  )
}
