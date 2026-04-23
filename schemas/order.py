from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .product import ProductResponse
from .user import UserResponse

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemResponse(CartItemBase):
    id: int
    user_id: int
    product: Optional[ProductResponse] = None

    class Config:
        from_attributes = True

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    product: Optional[ProductResponse] = None

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_price: float
    status: str
    created_at: datetime
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True

class OrderAdminResponse(OrderResponse):
    user: Optional[UserResponse] = None

    class Config:
        from_attributes = True
