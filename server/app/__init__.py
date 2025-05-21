import logging
from flask_cors import CORS
from flask import Flask
from app.extentions import bcrypt, jwt, db, migrate, bcrypt
from app.config import Config

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)

    # Enable CORS for all domains
    CORS(app)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    bcrypt.init_app(app)
    jwt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Register blueprints
    register_blueprints(app)
    
    # Register error handlers
    register_error_handlers(app)
    
    logger.info("Application initialized successfully")

    return app

def register_error_handlers(app):
    """Register error handlers for the application.
    
    Args:
        app: Flask application instance
    """
    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Not found", "message": str(error)}, 404
    
    @app.errorhandler(500)
    def server_error(error):
        return {"error": "Server error", "message": str(error)}, 500
    
    @app.errorhandler(400)
    def bad_request(error):
        return {"error": "Bad request", "message": str(error)}, 400
    
def register_blueprints(app):
    """Register blueprints for the application.
    
    Args:
        app: Flask application instance
    """

    from app.auth.route import user_bp

    blue_prints = [
        (user_bp, '/api/auth'),
    ]

    for blueprint, url_prefix in blue_prints:
        app.register_blueprint(blueprint, url_prefix=url_prefix)
