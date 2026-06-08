from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "PulseRoadmap API"
    app_version: str = "0.1.0"
    database_url: str # connection string comes from .env file
    ai_provider: str = "local"
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    model_config = SettingsConfigDict(env_file=".env", env_prefix="PULSEROADMAP_")


settings = Settings()
