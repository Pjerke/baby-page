from sqlalchemy.orm import Session
from .models import Measurement, BoardCard, Status
from .schemas import MeasurementCreate, BoardCardCreate, BoardCardUpdate

def get_all_measurements(db: Session):
    return db.query(Measurement).order_by(Measurement.date).all()

def create_measurement(db: Session, data: MeasurementCreate):
    measurement = Measurement(**data.dict())
    db.add(measurement)
    db.commit()
    db.refresh(measurement)
    return measurement

def get_all_board_cards(db: Session):
    return db.query(BoardCard).all()

def create_board_card(db: Session, data: BoardCardCreate):
    board_card = BoardCard(**data.dict())
    board_card.status = Status.OnHold
    db.add(board_card)
    db.commit()
    db.refresh(board_card)
    return board_card

def update_board_card(db: Session, data: BoardCardUpdate):
    card = db.get(BoardCard, data.id)
    card.status = data.status
    db.commit()
    db.refresh(card)
    return card
