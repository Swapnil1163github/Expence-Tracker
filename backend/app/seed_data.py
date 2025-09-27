from datetime import date, timedelta
from sqlmodel import Session, select
from .models import Expense

DEFAULT_CATEGORIES = ["Food", "Travel", "Shopping", "Utilities", "Other"]


def seed_if_empty(session: Session) -> None:
    count = session.exec(select(Expense)).first()
    if count is not None:
        return

    today = date.today()
    samples = [
        (249.0, "Food", today),
        (1200.0, "Shopping", today - timedelta(days=1)),
        (80.0, "Travel", today),
        (560.0, "Food", today - timedelta(days=2)),
        (300.0, "Utilities", today),
        (150.0, "Other", today - timedelta(days=3)),
        (999.0, "Shopping", today),
    ]
    for amount, category, d in samples:
        session.add(Expense(amount=amount, category=category, date=d))
    session.commit()
