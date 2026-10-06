from flask import Flask


def create_app(config_name="default"):
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # Load configuration
    # Assuming your Config class is imported from a config.py file in the root or app folder
    from app.config import config  # Adjust the import path based on your project structure

    # If config is a dictionary of environments (e.g., development, production):
    app.config.from_object(config[config_name])

    # Alternatively, if you are passing the Config class directly:
    # app.config.from_object(config_name)

    # Initialize extensions here (e.g., db, migrate, etc.) if applicable

    # Register blueprints here if applicable

    return app
