from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Simple simulated AI responses
BOT_RESPONSES = {
    "how do i register to vote?": "To register as a voter in India, visit nvsp.in and fill Form 6. You need proof of age, address, and a photo.",
    "am i eligible to vote?": "You are eligible if you are an Indian citizen and 18+ years old as of Jan 1st of the revision year.",
    "what documents do i need?": "You need Proof of Age (Birth cert/Passport) and Proof of Address (Aadhaar/Utility bill).",
}

@router.post("/", response_model=ChatResponse)
async def chat_with_assistant(request: ChatRequest):
    msg = request.message.lower().strip()
    
    # Simple lookup
    response_text = BOT_RESPONSES.get(msg)
    
    if not response_text:
        # Generic fallback
        response_text = "I'm your Votera Assistant. I can help with voter registration, polling info, and election dates. Could you be more specific?"
        
    return {"response": response_text}
