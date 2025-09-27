import React from 'react'
import { Stack, TextField } from '@mui/material'

export function Filters({ from, to, onChange }: {
  from: string
  to: string
  onChange: (next: { from: string; to: string }) => void
}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        type="date"
        label="From"
        InputLabelProps={{ shrink: true }}
        value={from}
        onChange={(e) => onChange({ from: e.target.value, to })}
      />
      <TextField
        type="date"
        label="To"
        InputLabelProps={{ shrink: true }}
        value={to}
        onChange={(e) => onChange({ from, to: e.target.value })}
      />
    </Stack>
  )
}
