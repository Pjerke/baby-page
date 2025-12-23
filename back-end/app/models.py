from enum import Enum
from sqlalchemy import Column, String, Integer, Float, Date, Enum as SqlEnum
from .database import Base

class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True)
    date = Column(Date, unique=True, nullable=False)
    temperature = Column(Float, nullable=True)
    weight = Column(Integer, nullable=True)

class Status(Enum):
    OnHold = 0
    ToDo = 1
    Doing = 2
    Done = 3
    Archived = 4

class ResetInterval(Enum):
    Daily = 0
    Weekly = 1

class Owner(Enum):
    Mommy = 0
    Daddy = 1
    MommyAndDaddy = 2
    Jacob = 3

class BoardCard(Base):
    __tablename__ = "board_cards"

    id = Column(Integer, primary_key=True)
    status = Column(SqlEnum(Status), nullable=False)
    reset_interval = Column(SqlEnum(ResetInterval), nullable=True)
    owner = Column(SqlEnum(Owner), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
