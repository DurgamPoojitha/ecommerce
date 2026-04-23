import pytest

def test_signup(client):
    response = client.post("/auth/signup", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword123"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "testuser"
    assert data["email"] == "testuser@example.com"
    assert "hashed_password" not in data  # Ensure security constraints are met!

def test_signup_duplicate_fails(client):
    response = client.post("/auth/signup", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "differentpassword"
    })
    # Should throw our customized 400 Exception
    assert response.status_code == 400

def test_login(client):
    # Standard OAuth2 form structure
    response = client.post("/auth/login", data={
        "username": "testuser",
        "password": "testpassword123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_invalid(client):
    response = client.post("/auth/login", data={
        "username": "testuser",
        "password": "wrongpassword"
    })
    assert response.status_code == 400

def test_get_me_unauthorized(client):
    response = client.get("/auth/me")
    assert response.status_code == 401
