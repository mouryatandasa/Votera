from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from app.core.config import Settings
engine=create_async_engine(Settings().DATABASE_URL)
SessionLocal=async_sessionmaker(engine,expire_on_commit=False,class_=AsyncSession)
async def get_db():
    async with SessionLocal() as db:
        yield db
