# PulseRoadmap API

FastAPI backend for PulseRoadmap.

## Local Development

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `GET /api/feedback`

