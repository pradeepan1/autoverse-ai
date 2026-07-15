"""
AutoVerse AI — Recommendation Engine Inference Service (Skeleton).

Bootstraps the inference service application only. No model loading,
recommendation endpoints, or ML logic is included at this stage.
"""

from fastapi import FastAPI

app = FastAPI(title="AutoVerse AI - Recommendation Inference Service", version="0.1.0")

# NOTE: Model loading and recommendation endpoints will be added in a
# subsequent development phase, per docs/PROJECT_RULES.md.
