from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uuid

router = APIRouter(prefix="/auth", tags=["Auth"])

# Mock database
users_db = {}

class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: str

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    new_user = {
        "id": user_id,
        "email": user.email,
        "full_name": user.full_name,
        "password": user.password # In real app, hash this!
    }
    users_db[user.email] = new_user
    return new_user

@router.post("/login")
async def login(user: UserLogin):
    db_user = users_db.get(user.email)
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "access_token": f"mock_token_{db_user['id']}",
        "token_type": "bearer",
        "user": {
            "id": db_user["id"],
            "email": db_user["email"],
            "full_name": db_user["full_name"]
        }
    }

@router.get("/me", response_model=UserResponse)
async def get_me(token: str):
    # Very simple mock token check
    if not token.startswith("mock_token_"):
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = token.replace("mock_token_", "")
    for u in users_db.values():
        if u["id"] == user_id:
            return u
            
    raise HTTPException(status_code=404, detail="User not found")
