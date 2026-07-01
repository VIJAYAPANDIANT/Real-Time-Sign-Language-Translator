from pydantic import BaseModel
from datetime import datetime

class TranslationSessionCreate(BaseModel):
    full_transcript: str

class TranslationSessionResponse(BaseModel):
    id: int
    full_transcript: str
    started_at: datetime

    model_config = {"from_attributes": True}
