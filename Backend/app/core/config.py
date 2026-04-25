from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    APP_NAME:str="VoteWise API"
    DATABASE_URL:str="postgresql+asyncpg://postgres:postgres@db:5432/votewise"
    JWT_SECRET:str="supersecretkey"
    JWT_ALGORITHM:str="HS256"
settings=Settings()
