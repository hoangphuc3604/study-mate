import os
from dotenv import load_dotenv

# Load environment variables
ENV = os.getenv("ENV", "dev")
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
env_file = os.path.join(BASE_DIR, f".env.{ENV}")
load_dotenv(dotenv_path=env_file)

class Config:
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM = "HS256"
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False