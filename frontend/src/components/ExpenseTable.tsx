import React, { useMemo } from 'react'
import { Expense } from '../api'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export function ExpenseTable({ items, onEdit, onDelete }: {
  items: Expense[]
  onEdit: (exp: Expense) => void
  onDelete?: (id: string) => void
}) {
  const rows = useMemo(() => items.sort((a, b) => b.date.localeCompare(a.date)), [items])
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Amount (₹)</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((e) => (
            <TableRow key={e.id} hover>
              <TableCell>{e.amount.toFixed(2)}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>{e.date}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" onClick={() => onEdit(e)} size="small"><EditIcon /></IconButton>
                {onDelete && (
                  <IconButton aria-label="delete" onClick={() => onDelete(e.id)} size="small" color="error"><DeleteIcon /></IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
