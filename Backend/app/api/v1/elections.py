from fastapi import APIRouter
router=APIRouter(prefix="/elections",tags=["Elections"])
@router.get("/")
async def elections():
    return {"items":[{"id":1,"name":"General Election","country":"India","status":"upcoming"}]}
@router.get("/live")
async def live():
    return {"status":"live"}
