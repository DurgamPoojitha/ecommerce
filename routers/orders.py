from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database.session import get_db
from models.order import Order, OrderItem, CartItem
from models.product import Product
from models.user import User
from schemas.order import OrderResponse, OrderAdminResponse
from services.auth import get_current_user, get_current_admin_user

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderResponse)
def place_order(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_price = 0
    order = Order(user_id=current_user.id, status="completed")
    db.add(order)
    db.flush()

    for c_item in cart_items:
        product = db.query(Product).filter(Product.id == c_item.product_id).first()
        if not product or product.stock < c_item.quantity:
            db.rollback()
            raise HTTPException(status_code=400, detail=f"Insufficient stock for product {c_item.product_id}")
        
        product.stock -= c_item.quantity
        item_price = product.price * c_item.quantity
        total_price += item_price

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=c_item.quantity,
            price=product.price
        )
        db.add(order_item)
        db.delete(c_item)

    order.total_price = total_price
    db.commit()
    db.refresh(order)
    return order

@router.get("/", response_model=List[OrderResponse])
def order_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Order).filter(Order.user_id == current_user.id).all()

@router.get("/all", response_model=List[OrderAdminResponse])
def get_all_orders(admin_user: User = Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return db.query(Order).all()
