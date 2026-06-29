import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.routers.products import router as products_router

load_dotenv()

app = FastAPI(
    title=os.getenv("API_TITLE", "DescrifyAI API"),
    description="AI-powered product description generator backend for food businesses",
    version=os.getenv("API_VERSION", "1.0.0"),
)

origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)


class DescriptionRequest(BaseModel):
    product_name: str
    ingredients: str
    flavor_profile: Optional[str] = None
    target_audience: Optional[str] = None
    tone: str = "premium"


class DescriptionResponse(BaseModel):
    description: str
    character_count: int
    seo_score: int


@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "DescrifyAI Backend API",
        "version": app.version,
    }


@app.post("/api/generate", response_model=DescriptionResponse)
async def generate_description(request: DescriptionRequest):
    if not request.product_name or not request.ingredients:
        raise HTTPException(status_code=400, detail="Product name and ingredients are required.")

    templates = {
        "premium": (
            f"Indulge in the exquisite flavor of our artisanal {request.product_name}. "
            f"Meticulously crafted using only the finest ingredients, including {request.ingredients}. "
            f"Each bite offers a sophisticated taste journey, highlighting {request.flavor_profile or 'exceptional quality'}. "
            f"Perfect for {request.target_audience or 'gourmet food lovers'} seeking a truly luxurious dining experience."
        ),
        "traditional": (
            f"Experience the authentic, time-honored taste of our homemade {request.product_name}. "
            f"Made from a cherished family recipe with wholesome {request.ingredients}, it preserves the rich legacy of traditional cooking. "
            f"Celebrated for its distinct character and {request.flavor_profile or 'heritage taste'}, "
            f"it brings warm comfort straight to your table. Ideal for {request.target_audience or 'every family'}."
        ),
        "health-focused": (
            f"Nourish your body and delight your senses with our clean-label {request.product_name}. "
            f"Formulated with nutrient-dense {request.ingredients}, it is designed to fuel your active lifestyle without compromise. "
            f"Free from artificial additives, it champions wellness while showcasing {request.flavor_profile or 'pure flavors'}. "
            f"Perfect for {request.target_audience or 'fitness enthusiasts'}."
        ),
        "friendly": (
            f"Hey there, food lover! Get ready to meet your new favorite: our delicious {request.product_name}! "
            f"Packed with goodness and real {request.ingredients}, it's the perfect treat for any time of day. "
            f"We've locked in amazing flavors like {request.flavor_profile or 'sweetness'} "
            f"so you and other {request.target_audience or 'friends'} can enjoy every single bite."
        ),
    }

    selected_tone = request.tone.lower()
    desc_template = templates.get(selected_tone, templates["premium"])

    return DescriptionResponse(
        description=desc_template,
        character_count=len(desc_template),
        seo_score=92,
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"detail": exc.errors()})
