import React from 'react'
import { Paper, Stack, Typography } from '@mui/material'
import { Summary as SummaryType } from '../api'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9C27B0', '#EF5350', '#66BB6A']

export function Summary({ summary }: { summary: SummaryType | null }) {
  if (!summary) return null
  const data = Object.entries(summary.by_category).map(([name, value]) => ({ name, value }))
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Total Spend: ₹{summary.total.toFixed(2)}</Typography>
        <Typography variant="subtitle1">By Category</Typography>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Stack>
    </Paper>
  )
}
