import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent.parent

# Data paths
DATA_DIR = BASE_DIR.parent.parent / "data"
REPORTS_DIR = BASE_DIR.parent.parent / "reports"

# Backend configuration
BACKEND_CONFIG = {
    'host': os.getenv('FLASK_HOST', '0.0.0.0'),
    'port': int(os.getenv('FLASK_PORT', 5000)),
    'debug': os.getenv('FLASK_DEBUG', 'False').lower() == 'true',
    'environment': os.getenv('FLASK_ENV', 'development')
}

# Frontend configuration
FRONTEND_CONFIG = {
    'port': int(os.getenv('REACT_APP_PORT', 3000)),
    'api_url': os.getenv('REACT_APP_API_URL', 'http://localhost:5000'),
    'environment': os.getenv('REACT_APP_ENVIRONMENT', 'development')
}

# Database configuration
DATABASE_CONFIG = {
    'brent_data_path': DATA_DIR / "raw" / "BrentOilPrices.csv",
    'events_data_path': REPORTS_DIR / "events_timeline.csv"
}

# API configuration
API_CONFIG = {
    'cors_origins': os.getenv('CORS_ORIGINS', '*').split(','),
    'rate_limit': int(os.getenv('RATE_LIMIT', 100)),
    'timeout': int(os.getenv('API_TIMEOUT', 30))
}

# Analysis configuration
ANALYSIS_CONFIG = {
    'volatility_window': int(os.getenv('VOLATILITY_WINDOW', 30)),
    'change_points_threshold': float(os.getenv('CHANGE_POINTS_THRESHOLD', 0.95)),
    'max_change_points': int(os.getenv('MAX_CHANGE_POINTS', 15))
}

# Logging configuration
LOGGING_CONFIG = {
    'level': os.getenv('LOG_LEVEL', 'INFO'),
    'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    'file': BASE_DIR / "logs" / "dashboard.log"
}

# Security configuration
SECURITY_CONFIG = {
    'secret_key': os.getenv('SECRET_KEY', 'your-secret-key-change-in-production'),
    'session_timeout': int(os.getenv('SESSION_TIMEOUT', 3600))
}
