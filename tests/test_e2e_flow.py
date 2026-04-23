import pytest
from models.user import User, RoleEnum

def test_full_e2e_shopping_flow(client, db_session):
    # 1. Setup Admin
    client.post("/auth/signup", json={"username": "bigboss", "email": "boss@example.com", "password": "supersecret"})
    user = db_session.query(User).filter(User.username == "bigboss").first()
    user.role = RoleEnum.admin
    db_session.commit()
    
    admin_token = client.post("/auth/login", data={"username": "bigboss", "password": "supersecret"}).json()["access_token"]
    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    
    # 2. Admin creates Category and Product
    res_cat = client.post("/products/categories/", json={"name": "Toys", "description": "Fun stuff"}, headers=admin_headers)
    assert res_cat.status_code == 200
    cat_id = res_cat.json()["id"]
    
    res_prod = client.post("/products/", json={
        "title": "Action Figure",
        "description": "Cool toy.",
        "price": 25.50,
        "stock": 100,
        "category_id": cat_id
    }, headers=admin_headers)
    assert res_prod.status_code == 200
    prod_id = res_prod.json()["id"]
    
    # 3. Setup regular User
    client.post("/auth/signup", json={"username": "shopper", "email": "shopper@example.com", "password": "shoppassword"})
    user_token = client.post("/auth/login", data={"username": "shopper", "password": "shoppassword"}).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}
    
    # 4. User views product
    res_list = client.get("/products/")
    assert res_list.status_code == 200
    assert any(p["id"] == prod_id for p in res_list.json())
    
    # 5. User adds product to cart
    res_cart_add = client.post("/cart/", json={"product_id": prod_id, "quantity": 2}, headers=user_headers)
    assert res_cart_add.status_code == 200
    assert res_cart_add.json()["quantity"] == 2
    
    # 6. User verifies Cart
    res_cart = client.get("/cart/", headers=user_headers)
    assert len(res_cart.json()) == 1
    
    # 7. User Checkouts (places order)
    res_order = client.post("/orders/", headers=user_headers)
    assert res_order.status_code == 200
    assert res_order.json()["total_price"] == 51.0  # 2 * 25.50
    assert res_order.json()["status"] == "completed"
    
    # 8. User checks Order History
    res_history = client.get("/orders/", headers=user_headers)
    assert res_history.status_code == 200
    assert len(res_history.json()) >= 1
    assert res_history.json()[0]["total_price"] == 51.0
