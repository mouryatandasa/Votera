from datetime import datetime,timedelta
from jose import jwt
from passlib.context import CryptContext
from app.core.config import Settings
pwd=CryptContext(schemes=["bcrypt"],deprecated="auto")
def hash_password(p): return pwd.hash(p)
def verify_password(p,h): return pwd.verify(p,h)
def create_access_token(data:dict):
    d=data.copy(); d["exp"]=datetime.utcnow()+timedelta(minutes=30)
    s=Settings()
    return jwt.encode(d,s.JWT_SECRET,algorithm=s.JWT_ALGORITHM)
