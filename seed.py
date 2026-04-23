import os
import sys

# Ensure we're using the test database since the server is running on it
os.environ["DATABASE_URL"] = "sqlite:///./test.db"

from database.session import engine, SessionLocal
from database.base import Base
from models.user import User, RoleEnum
from models.product import Category, Product
from services.auth import get_password_hash

def seed_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Create Admin
    admin_username = "admin"
    admin_email = "admin@example.com"
    admin_user = db.query(User).filter(User.username == admin_username).first()
    if not admin_user:
        hashed_password = get_password_hash("adminpassword")
        admin_user = User(
            username=admin_username,
            email=admin_email,
            hashed_password=hashed_password,
            role=RoleEnum.admin
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print("Admin user created.")
    else:
        print("Admin user already exists.")

    # Create Categories
    categories_data = [
        {"name": "Snacks", "description": "Tasty and delicious snacks"},
        {"name": "Furniture", "description": "Home and office furniture"},
        {"name": "Electronics", "description": "Gadgets and devices"},
        {"name": "Clothes", "description": "Apparel and fashion"}
    ]
    
    category_map = {}
    for cat in categories_data:
        db_cat = db.query(Category).filter(Category.name == cat["name"]).first()
        if not db_cat:
            db_cat = Category(**cat)
            db.add(db_cat)
            db.commit()
            db.refresh(db_cat)
        category_map[cat["name"]] = db_cat.id

    # Create Products
    products_data = [
        {"title": "Kurkure Masala Munch", "description": "Spicy Indian snack.", "price": 20, "stock": 100, "category_name": "Snacks", "image_url": "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1470&auto=format&fit=crop"},
        {"title": "Haldiram's Bhujia", "description": "Classic savory snack.", "price": 50, "stock": 200, "category_name": "Snacks", "image_url": "https://images.unsplash.com/photo-1621447504864-d87311c14041?q=80&w=1502&auto=format&fit=crop"},
        
        {"title": "Wooden Study Table", "description": "Ergonomic study table for your home office.", "price": 4500, "stock": 20, "category_name": "Furniture", "image_url": "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1469&auto=format&fit=crop"},
        {"title": "Ergonomic Office Chair", "description": "Comfortable chair with lumbar support.", "price": 6000, "stock": 15, "category_name": "Furniture", "image_url": "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1471&auto=format&fit=crop"},
        
        {"title": "Smartphone 5G", "description": "Latest 5G smartphone with incredible camera.", "price": 45000, "stock": 50, "category_name": "Electronics", "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1480&auto=format&fit=crop"},
        {"title": "Wireless Earbuds", "description": "Noise-cancelling wireless earbuds.", "price": 2500, "stock": 150, "category_name": "Electronics", "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1632&auto=format&fit=crop"},
        
        {"title": "Cotton T-Shirt", "description": "100% pure cotton comfortable tee.", "price": 499, "stock": 300, "category_name": "Clothes", "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop"},
        {"title": "Denim Jeans", "description": "Classic blue slim-fit jeans.", "price": 1299, "stock": 100, "category_name": "Clothes", "image_url": "https://images.unsplash.com/photo-1542272604-780447ec15cd?q=80&w=1470&auto=format&fit=crop"}
    ]
    
    for prod in products_data:
        db_prod = db.query(Product).filter(Product.title == prod["title"]).first()
        if not db_prod:
            cat_id = category_map[prod["category_name"]]
            new_prod = Product(
                title=prod["title"],
                description=prod["description"],
                price=prod["price"],
                stock=prod["stock"],
                category_id=cat_id,
                image_url=prod.get("image_url")
            )
            db.add(new_prod)
            db.commit()
    print("Products seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed_data()
