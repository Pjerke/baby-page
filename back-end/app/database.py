from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = "sqlite:///./baby.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

# (0, '2025-12-10', 36.5, 3294),
# (1, '2025-12-11', 36.5, 3134),
# (2, '2025-12-12', 36.7, 3025),
# (3, '2025-12-13', 36.7, 3090),
# (4, '2025-12-14', 36.8, 3050),
# (5, '2025-12-15', 36.6, 3090),
# (6, '2025-12-16', 36.8, 3090),
# (7, '2025-12-17', 37.2, 3150),
# (8, '2025-12-18', 36.9, 3180);
# (9, '2025-12-20', NULL, 3335);
