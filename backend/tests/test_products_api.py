from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_products_returns_list():
    response = client.get("/api/products")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_create_update_and_delete_product_flow():
    create_response = client.post(
        "/api/products",
        json={
            "name": "Spiced Honey",
            "category": "Condiments",
            "price": 8.5,
            "description": "A warm flavor profile for breakfast spreads",
            "in_stock": True,
        },
    )
    assert create_response.status_code == 201
    created = create_response.json()
    product_id = created["id"]

    get_response = client.get(f"/api/products/{product_id}")
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Spiced Honey"

    update_response = client.patch(
        f"/api/products/{product_id}",
        json={"price": 9.75, "in_stock": False},
    )
    assert update_response.status_code == 200
    assert update_response.json()["price"] == 9.75
    assert update_response.json()["in_stock"] is False

    delete_response = client.delete(f"/api/products/{product_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["deleted"] is True


def test_search_products_by_name():
    response = client.get("/api/products/search", params={"q": "vanilla"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any("vanilla" in item["name"].lower() for item in data)
