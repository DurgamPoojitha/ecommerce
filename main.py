from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Added: CORS middleware for cross-origin requests from React
from database.session import engine
from database.base import Base

import models.user
import models.product
import models.order

from routers.auth import router as auth_router
from routers.products import router as products_router
from routers.cart import router as cart_router
from routers.orders import router as orders_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="E-commerce Backend API",
    description="A production-ready E-commerce backend using FastAPI and PostgreSQL.",
    version="1.0.0"
)

# Added: Allowing frontend origins explicitly to resolve CORS issues from localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(products_router)
app.include_router(cart_router)
app.include_router(orders_router)

@app.get("/")
def root():
    return {"message": "Welcome to the E-commerce API. Visit /docs for Swagger UI documentation."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
