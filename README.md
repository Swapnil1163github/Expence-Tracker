# Expense Tracker (FastAPI + React)

A full-stack Expense Tracker with a FastAPI backend (SQLite via SQLModel) and a React (Vite + Material UI + TypeScript) frontend.

## Features
- Add expenses with amount (₹), category (preset or custom), date
- List expenses with edit and delete
- Summary: total and category-wise breakdown
- Filters by date range (client-side)
- Pie chart visualization (Recharts)

## Tech Stack
- Backend: FastAPI, SQLModel, SQLite, Uvicorn
- Frontend: React (Vite, TS), Material UI, Axios, Recharts, Day.js

## Getting Started (Windows)

### 1) Backend
```
python -m venv .venv
.\.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 --app-dir backend
```
- API will run at http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs

### 2) Frontend
```
cd "frontend"
npm install
npm run dev
```
- App will run at http://127.0.0.1:5173

If your backend is on a different host/port, set `VITE_API_BASE` in `frontend/.env`:
```
VITE_API_BASE=http://127.0.0.1:8000
```

## Project Structure
```
backend/
  app/
    __init__.py
    main.py
    database.py
    models.py
    seed_data.py
  requirements.txt
frontend/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    api.ts
    components/
      ExpenseForm.tsx
      ExpenseTable.tsx
      Summary.tsx
      EditDialog.tsx
      Filters.tsx
```

## Notes
- CORS is enabled for Vite dev server ports.
- Backend seeds 5–10 sample expenses on first run.
- Validations: amount > 0 enforced by backend. Other fields required.
- The date range filter is client-side; you can extend the API to support server-side range queries later.
