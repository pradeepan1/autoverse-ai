import requests

def test_brands():
    try:
        response = requests.get('http://localhost:8000/api/v1/brands/')
        print(f"Status Code: {response.status_code}")
        print("Response JSON:")
        print(response.json())
        print("Brands verification passed!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    test_brands()
