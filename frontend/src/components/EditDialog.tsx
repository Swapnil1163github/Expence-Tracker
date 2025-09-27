import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Expense } from '../api'

export function EditDialog({ open, expense, categories, onClose, onSave }: {
  open: boolean
  expense: Expense | null
  categories: string[]
  onClose: () => void
  onSave: (changes: { amount: number; category: string; date: string }) => void
}) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (expense) {
      setAmount(String(expense.amount))
      setCategory(expense.category)
      setDate(dayjs(expense.date))
    }
  }, [expense])

  function handleSave() {
    if (!amount || !date) return
    onSave({ amount: Number(amount), category, date: date.format('YYYY-MM-DD') })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
            fullWidth
            margin="dense"
            label="Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField fullWidth select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} margin="dense">
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <DatePicker label="Date" value={date} onChange={(d) => setDate(d)} format="YYYY-MM-DD" />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}
