# PulseRoadmap API

FastAPI backend for PulseRoadmap.

## Local Development

Start PostgreSQL from the repository root:

```bash
cd /Users/trieuvo/Documents/projects/PulseRoadmap
docker compose up -d db
```

Create local API environment variables:

```bash
cp apps/api/.env.example apps/api/.env
```

Install dependencies:

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Apply database migrations:

```bash
alembic upgrade head
```

Run the API:

```bash
uvicorn app.main:app --reload --port 8000
```

Run backend tests:

```bash
python -m unittest discover -s tests
```

Use the local AI provider by default:

```env
PULSEROADMAP_AI_PROVIDER="local"
```

To use OpenAI for generated briefs, set:

```env
PULSEROADMAP_AI_PROVIDER="openai"
PULSEROADMAP_OPENAI_API_KEY="your-api-key"
PULSEROADMAP_OPENAI_MODEL="gpt-5.2"
```

Open Swagger UI:

```txt
http://127.0.0.1:8000/docs
```

## Database Commands

Check running containers:

```bash
cd /Users/trieuvo/Documents/projects/PulseRoadmap
docker compose ps
```

View feedback rows:

```bash
docker compose exec db psql -U pulseroadmap -d pulseroadmap -c "SELECT id, customer, request, urgency FROM feedback ORDER BY created_at DESC;"
```

Create a new migration after changing SQLAlchemy models:

```bash
cd apps/api
source .venv/bin/activate
alembic revision --autogenerate -m "describe change"
```

Apply migrations:

```bash
alembic upgrade head
```

Check current migration:

```bash
alembic current
```

Check model/schema drift:

```bash
alembic check
```

Reset local database:

```bash
cd /Users/trieuvo/Documents/projects/PulseRoadmap
docker compose down -v
docker compose up -d db
cd apps/api
source .venv/bin/activate
alembic upgrade head
python -c "from app.data.db.init_db import init_db; init_db(); print('seed complete')"
```

Warning: `docker compose down -v` deletes local database data.

## Endpoints

- `GET /health`
- `GET /api/feedback`
- `POST /api/feedback`
