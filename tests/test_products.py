import pytest
from models.user import User, RoleEnum

def test_create_category_unauthorized(client):
    # Endpoint requires Admin role
    response = client.post("/products/categories/", json={"name": "Audio", "description": "Sound gear"})
    assert response.status_code == 401

def test_create_category_admin(client, db_session):
    # 1. Signup a potential admin
    client.post("/auth/signup", json={
        "username": "admin_one",
        "email": "admin@example.com",
        "password": "supersecure"
    })
    
    # 2. Force elevation directly in DB since Signup defaults to Customer reliably
    user = db_session.query(User).filter(User.username == "admin_one").first()
    user.role = RoleEnum.admin
    db_session.commit()
    
    # 3. Login to derive token
    res = client.post("/auth/login", data={"username": "admin_one", "password": "supersecure"})
    token = res.json()["access_token"]
    
    # 4. Perform protected route interaction
    response = client.post(
        "/products/categories/", 
        json={"name": "Networking", "description": "Routers and Switches"}, 
        headers={"Authorization": f"Bearer {token}"}
    )
    
    assert response.status_code == 200
    assert response.json()["name"] == "Networking"

def test_get_categories(client):
    response = client.get("/products/categories/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) >= 1
