from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os

app = FastAPI(
    title="DescrifyAI API",
    description="AI-powered product description generator backend for food businesses",
    version="1.0.0"
)

# Configure CORS so our React frontend can make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        "version": "1.0.0"
    }

@app.post("/api/generate", response_model=DescriptionResponse)
async def generate_description(request: DescriptionRequest):
    if not request.product_name or not request.ingredients:
        raise HTTPException(status_code=400, detail="Product name and ingredients are required.")
    
    # Simple templates mapping matching the frontend services
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
        )
    }

    selected_tone = request.tone.lower()
    desc_template = templates.get(selected_tone, templates["premium"])
    
    return DescriptionResponse(
        description=desc_template,
        character_count=len(desc_template),
        seo_score=92  # Standard rating
    )
