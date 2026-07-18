import sys
import os
from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app
from app.modules.auth.routes.dependencies import get_current_user, RoleChecker
from app.modules.auth.models.user import User

# Add a temporary admin protected route for testing role gating
@app.get("/api/v1/test-admin-only")
def test_admin_only(current_user: User = Depends(RoleChecker(["admin"]))):
    return {"message": "Hello admin!"}

client = TestClient(app)

def test_auth_workflow():
    print("\n--- Starting Module 02 Auth Flow Tests ---")
    
    # Recreate tables to ensure clean test state
    from app.db.session import engine
    from app.db.base import Base
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    # 1. Registration tests
    print("Testing Registration...")
    email = "testuser@example.com"
    register_payload = {
        "email": email,
        "full_name": "Test User",
        "password": "securepassword123",
        "role": "buyer",
        "phone": "+919876543210"
    }
    
    response = client.post("/api/v1/auth/register", json=register_payload)
    assert response.status_code == 200, f"Register failed: {response.text}"
    res_data = response.json()
    assert res_data["success"] is True
    assert "access_token" in res_data["data"]
    assert "refresh_token" in res_data["data"]
    assert res_data["data"]["user"]["email"] == email
    assert res_data["data"]["user"]["role"] == "buyer"
    print("Registration OK.")
    
    # Test duplicate registration
    print("Testing Duplicate Registration Block...")
    response = client.post("/api/v1/auth/register", json=register_payload)
    assert response.status_code == 409, f"Duplicate allowed: {response.text}"
    print("Duplicate Registration Blocked OK.")

    # 2. Login tests
    print("Testing Login...")
    login_payload = {
        "email": email,
        "password": "securepassword123"
    }
    response = client.post("/api/v1/auth/login", json=login_payload)
    assert response.status_code == 200, f"Login failed: {response.text}"
    login_data = response.json()
    assert login_data["success"] is True
    access_token = login_data["data"]["access_token"]
    refresh_token = login_data["data"]["refresh_token"]
    assert access_token is not None
    assert refresh_token is not None
    print("Login OK.")
    
    # Test bad password login
    print("Testing Login with Invalid Credentials...")
    bad_login_payload = {
        "email": email,
        "password": "wrongpassword"
    }
    response = client.post("/api/v1/auth/login", json=bad_login_payload)
    assert response.status_code == 401, f"Bad password login allowed: {response.text}"
    print("Invalid Credentials Blocked OK.")

    # 3. Current user /me tests
    print("Testing GET /auth/me...")
    headers = {"Authorization": f"Bearer {access_token}"}
    response = client.get("/api/v1/auth/me", headers=headers)
    assert response.status_code == 200, f"Get me failed: {response.text}"
    me_data = response.json()
    assert me_data["success"] is True
    assert me_data["data"]["email"] == email
    print("GET /auth/me OK.")

    # Test /me without authorization
    print("Testing GET /auth/me without token...")
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401, f"GET /me allowed without token: {response.text}"
    print("GET /auth/me without token blocked OK.")

    # 4. Role Gating / Gated routes tests
    print("Testing Role-Based Access Control...")
    # Attempting to access admin-only endpoint with a buyer token
    response = client.get("/api/v1/test-admin-only", headers=headers)
    assert response.status_code == 403, f"Buyer allowed on admin route: {response.text}"
    assert response.json()["detail"] == "PERMISSION_DENIED"
    print("Buyer blocked from Admin route OK.")

    # Register an admin user to verify access
    print("Registering Admin User...")
    admin_register_payload = {
        "email": "adminuser@example.com",
        "full_name": "Admin User",
        "password": "securepassword123",
        "role": "admin"
    }
    response = client.post("/api/v1/auth/register", json=admin_register_payload)
    assert response.status_code == 200
    admin_tokens = response.json()["data"]
    admin_access_token = admin_tokens["access_token"]
    
    admin_headers = {"Authorization": f"Bearer {admin_access_token}"}
    response = client.get("/api/v1/test-admin-only", headers=admin_headers)
    assert response.status_code == 200, f"Admin blocked from Admin route: {response.text}"
    assert response.json()["message"] == "Hello admin!"
    print("Admin allowed on Admin route OK.")

    # 5. Token Refresh tests
    print("Testing Token Refresh...")
    refresh_payload = {
        "refresh_token": refresh_token
    }
    response = client.post("/api/v1/auth/refresh", json=refresh_payload)
    assert response.status_code == 200, f"Refresh failed: {response.text}"
    refresh_data = response.json()
    assert refresh_data["success"] is True
    new_access_token = refresh_data["data"]["access_token"]
    new_refresh_token = refresh_data["data"]["refresh_token"]
    assert new_access_token != access_token
    assert new_refresh_token != refresh_token
    print("Token Refresh & Rotation OK.")

    # Verify new access token works
    new_headers = {"Authorization": f"Bearer {new_access_token}"}
    response = client.get("/api/v1/auth/me", headers=new_headers)
    assert response.status_code == 200
    print("New Access Token Verification OK.")

    # 6. Logout tests
    print("Testing Logout...")
    response = client.post("/api/v1/auth/logout", headers=new_headers)
    assert response.status_code == 200, f"Logout failed: {response.text}"
    assert response.json()["success"] is True
    print("Logout OK.")
    
    print("\n--- All Module 02 Auth Flow Tests Passed! ---")

if __name__ == "__main__":
    test_auth_workflow()
