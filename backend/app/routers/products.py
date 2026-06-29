from typing import List
from uuid import uuid4

from fastapi import APIRouter, HTTPException, Query

from app.schemas.products import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter(prefix="/api/products", tags=["products"])

products_db: List[dict] = [
    {
        "id": "prod-001",
        "name": "Vanilla Bean Crumble",
        "category": "Desserts",
        "price": 12.5,
        "description": "A premium dessert offering rich vanilla notes.",
        "in_stock": True,
    },
    {
        "id": "prod-002",
        "name": "Honey Citrus Tea",
        "category": "Beverages",
        "price": 6.75,
        "description": "Bright citrus and floral honey in a comforting tea blend.",
        "in_stock": True,
    },
]


@router.get("", response_model=List[ProductResponse])
def list_products() -> List[dict]:
    return products_db


@router.get("/search", response_model=List[ProductResponse])
def search_products(q: str = Query(..., min_length=1)) -> List[dict]:
    query = q.lower()
    return [product for product in products_db if query in product["name"].lower() or query in product["description"].lower()]


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: str) -> dict:
    product = next((item for item in products_db if item["id"] == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=ProductResponse, status_code=201)
def create_product(payload: ProductCreate) -> dict:
    product = {
        "id": f"prod-{uuid4().hex[:6]}",
        **payload.model_dump(),
    }
    products_db.append(product)
    return product


@router.patch("/{product_id}", response_model=ProductResponse)
def update_product(product_id: str, payload: ProductUpdate) -> dict:
    product = next((item for item in products_db if item["id"] == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = payload.model_dump(exclude_unset=True)
    product.update(update_data)
    return product


@router.delete("/{product_id}")
def delete_product(product_id: str) -> dict:
    product = next((item for item in products_db if item["id"] == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    products_db.remove(product)
    return {"deleted": True, "id": product_id}
