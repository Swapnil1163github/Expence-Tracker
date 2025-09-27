from __future__ import annotations
from collections import defaultdict
from datetime import date
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select

from .database import init_db, get_session
from .models import Expense, ExpenseCreate, ExpenseUpdate, Summary

app = FastAPI(title="Expense Tracker API", version="1.0.0")

# CORS for Vite dev server and common ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    from .seed_data import seed_if_empty

    init_db()
    with get_session() as session:
        seed_if_empty(session)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/expenses", response_model=Expense)
def create_expense(payload: ExpenseCreate):
    if payload.amount <= 0:
        raise HTTPException(status_code=422, detail="Amount must be greater than 0")

    expense = Expense(amount=payload.amount, category=payload.category, date=payload.date)
    with get_session() as session:
        session.add(expense)
        session.commit()
        session.refresh(expense)
    return expense


@app.get("/expenses", response_model=List[Expense])
def list_expenses(date: Optional[date] = None):
    with get_session() as session:
        if date is not None:
            stmt = select(Expense).where(Expense.date == date).order_by(Expense.date.desc())
        else:
            stmt = select(Expense).order_by(Expense.date.desc())
        return list(session.exec(stmt).all())


@app.get("/expenses/summary", response_model=Summary)
def get_summary():
    with get_session() as session:
        expenses = session.exec(select(Expense)).all()
    by_category: dict[str, float] = defaultdict(float)
    total = 0.0
    for exp in expenses:
        by_category[exp.category] += exp.amount
        total += exp.amount
    return Summary(total=total, by_category=dict(by_category))


@app.put("/expenses/{expense_id}", response_model=Expense)
def update_expense(expense_id: str, payload: ExpenseUpdate):
    from uuid import UUID

    try:
        uid = UUID(expense_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid expense id")

    with get_session() as session:
        expense = session.get(Expense, uid)
        if not expense:
            raise HTTPException(status_code=404, detail="Expense not found")

        if payload.amount is not None:
            if payload.amount <= 0:
                raise HTTPException(status_code=422, detail="Amount must be greater than 0")
            expense.amount = payload.amount
        if payload.category is not None:
            expense.category = payload.category
        if payload.date is not None:
            expense.date = payload.date

        from datetime import datetime
        expense.updated_at = datetime.utcnow()

        session.add(expense)
        session.commit()
        session.refresh(expense)
        return expense


@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):
    from uuid import UUID

    try:
        uid = UUID(expense_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid expense id")

    with get_session() as session:
        expense = session.get(Expense, uid)
        if not expense:
            raise HTTPException(status_code=404, detail="Expense not found")
        session.delete(expense)
        session.commit()
    return {"ok": True}
