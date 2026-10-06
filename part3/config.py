import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "you-will-never-guess"
    # Other base config variables...


class DevelopmentConfig(Config):
    DEBUG = True
    # Development-specific variables...


class ProductionConfig(Config):
    DEBUG = False
    # Production-specific variables...


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
