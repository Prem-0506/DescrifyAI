# DescrifyAI Backend

## How to run backend locally

1. Create and activate a virtual environment:
   - Windows PowerShell: `python -m venv .venv` then `.venv\Scripts\Activate.ps1`
2. Install dependencies:
   - `pip install -r requirements.txt`
3. Copy the environment example file and update values if needed:
   - `Copy-Item .env.example .env`
4. Start the API server:
   - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

## API overview

- `GET /` – health check
- `GET /api/products` – list products
- `GET /api/products/search?q=vanilla` – search products
- `GET /api/products/{product_id}` – fetch a single product
- `POST /api/products` – create a product
- `PATCH /api/products/{product_id}` – update a product
- `DELETE /api/products/{product_id}` – delete a product
- `POST /api/generate` – generate a product description

## Notes

- The backend uses an in-memory store for demo purposes.
- Environment variables are loaded from `.env` and can be configured in `.env.example`.
