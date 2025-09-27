import datetime
from typing import Optional, Dict
from uuid import uuid4, UUID
from sqlmodel import SQLModel, Field


class Expense(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True, index=True)
    amount: float = Field(ge=0.01, description="Expense amount in INR")
    category: str = Field(index=True, min_length=1, max_length=64)
    date: datetime.date = Field(index=True, description="Expense date")
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)


class ExpenseCreate(SQLModel):
    amount: float = Field(ge=0.01)
    category: str = Field(min_length=1, max_length=64)
    date: datetime.date


class ExpenseUpdate(SQLModel):
    amount: Optional[float] = Field(default=None, ge=0.01)
    category: Optional[str] = Field(default=None, min_length=1, max_length=64)
    date: Optional[datetime.date] = None


class Summary(SQLModel):
    total: float
    by_category: Dict[str, float]
