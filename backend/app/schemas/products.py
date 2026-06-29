from typing import Optional

from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    name: str = Field(..., min_length=2)
    category: str = Field(..., min_length=2)
    price: float = Field(..., ge=0)
    description: str = Field(..., min_length=4)
    in_stock: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2)
    category: Optional[str] = Field(None, min_length=2)
    price: Optional[float] = Field(None, ge=0)
    description: Optional[str] = Field(None, min_length=4)
    in_stock: Optional[bool] = None


class ProductResponse(ProductBase):
    id: str
