from pydantic import BaseModel
from datetime import date
from typing import Optional
from .models import Status, ResetInterval, Owner

class MeasurementCreate(BaseModel):
    date: date
    temperature: float | None = None
    weight: float | None = None

class MeasurementResponse(MeasurementCreate):
    id: int

    class Config:
        from_attributes = True

class BoardCardCreate(BaseModel):
    reset_interval: Optional[ResetInterval] = None
    owner: Owner
    title: str
    description: Optional[str] = None

class BoardCardUpdate(BaseModel):
    id: int
    status: Status
    reset_interval: Optional[ResetInterval] = None
    owner: Owner
    title: str
    description: Optional[str] = None

class BoardCardResponse(BaseModel):
    id: int
    status: Status
    reset_interval: Optional[ResetInterval] = None
    owner: Owner
    title: str
    description: Optional[str] = None

    class Config:
        from_attributes = True
