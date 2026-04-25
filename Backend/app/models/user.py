import uuid
from sqlalchemy.orm import Mapped,mapped_column
from sqlalchemy import String,Boolean
from app.models.base import Base
class User(Base):
    __tablename__="users"
    id:Mapped[str]=mapped_column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    email:Mapped[str]=mapped_column(String,unique=True,index=True)
    full_name:Mapped[str]=mapped_column(String)
    hashed_password:Mapped[str]=mapped_column(String)
    is_active:Mapped[bool]=mapped_column(Boolean,default=True)
