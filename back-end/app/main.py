from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from . import schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Baby Page API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/measurement", response_model=list[schemas.MeasurementResponse])
def get_measurements(db: Session = Depends(get_db)):
    return crud.get_all_measurements(db)

@app.post("/measurement", response_model=schemas.MeasurementResponse)
def add_measurement(measurement: schemas.MeasurementCreate, db: Session = Depends(get_db)):
    return crud.create_measurement(db, measurement)

@app.get("/board-card", response_model=list[schemas.BoardCardResponse])
def get_board_cards(db: Session = Depends(get_db)):
    return crud.get_all_board_cards(db)

@app.post("/board-card", response_model=schemas.BoardCardResponse)
def create_board_card(card: schemas.BoardCardCreate, db: Session = Depends(get_db)):
    return crud.create_board_card(db, card)

@app.put("/board-card", response_model=schemas.BoardCardResponse)
def update_board_card(card: schemas.BoardCardUpdate, db: Session = Depends(get_db)):
    return crud.update_board_card(db, card)
