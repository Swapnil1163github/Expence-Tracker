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

Screenshots:
<img width="1918" height="861" alt="0" src="https://github.com/user-attachments/assets/543a1e5b-76c9-419c-94b0-ee9a49cf29c1" />
<img width="1920" height="858" alt="1" src="https://github.com/user-attachments/assets/f788ce7f-e29c-4f4b-b932-25d46a19749f" />
<img width="1917" height="867" alt="2" src="https://github.com/user-attachments/assets/e2f73ccc-230f-488b-89f3-006de1a3dfd9" />
<img width="1917" height="867" alt="3" src="https://github.com/user-attachments/assets/5401e61b-1809-4a58-9af4-a9c09f87e6a8" />
<img width="1918" height="866" alt="4" src="https://github.com/user-attachments/assets/ef92bfa7-2537-4345-b3ad-657a606d71fb" />
<img width="1918" height="862" alt="5" src="https://github.com/user-attachments/assets/3c29e46b-9414-4e38-a64d-4304cfdb8611" />
<img width="1918" height="863" alt="6" src="https://github.com/user-attachments/assets/f9c993ab-dadd-4cf9-bb62-6ebd0a21d9c4" />







