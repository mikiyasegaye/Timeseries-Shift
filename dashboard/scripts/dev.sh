#!/bin/bash

# Brent Oil Dashboard - Development Start Script
# This script starts the dashboard in development mode

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_PORT=5000
FRONTEND_PORT=3000
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo -e "${BLUE}🔧 Brent Oil Dashboard - Development Mode${NC}"
echo -e "${BLUE}=============================================${NC}"

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "$PROJECT_ROOT/backend/app.py" ]; then
    print_error "Backend app.py not found. Please run this script from the dashboard directory."
    exit 1
fi

if [ ! -f "$PROJECT_ROOT/frontend/package.json" ]; then
    print_error "Frontend package.json not found. Please run this script from the dashboard directory."
    exit 1
fi

print_status "Project structure verified"

# Check data files
echo -e "${BLUE}📊 Checking data files...${NC}"

if [ -f "$PROJECT_ROOT/../../data/raw/BrentOilPrices.csv" ]; then
    print_status "BrentOilPrices.csv found"
else
    print_error "BrentOilPrices.csv not found in data/raw/"
    print_info "Please ensure the data file exists before starting development"
    exit 1
fi

if [ -f "$PROJECT_ROOT/../../reports/events_timeline.csv" ]; then
    print_status "events_timeline.csv found"
else
    print_error "events_timeline.csv not found in reports/"
    print_info "Please ensure the events file exists before starting development"
    exit 1
fi

echo ""
echo -e "${BLUE}🚀 Development Options:${NC}"
echo "1. Start Backend Only (Flask API)"
echo "2. Start Frontend Only (React App)"
echo "3. Start Both (requires 2 terminals)"
echo "4. Install Dependencies Only"
echo "5. Check Status"
echo "6. Exit"
echo ""

read -p "Choose an option (1-6): " choice

case $choice in
    1)
        echo -e "${BLUE}🚀 Starting Backend Only...${NC}"
        cd "$PROJECT_ROOT/backend"
        
        # Check if virtual environment exists
        if [ ! -d "venv" ]; then
            print_info "Creating virtual environment..."
            python3 -m venv venv
        fi
        
        # Activate virtual environment
        source venv/bin/activate
        
        # Install dependencies
        print_info "Installing backend dependencies..."
        pip install -r requirements.txt
        
        print_status "Backend dependencies installed"
        print_info "Starting Flask server on http://localhost:$BACKEND_PORT"
        print_info "Press Ctrl+C to stop"
        
        python app.py
        ;;
    2)
        echo -e "${BLUE}🚀 Starting Frontend Only...${NC}"
        cd "$PROJECT_ROOT/frontend"
        
        # Install dependencies
        print_info "Installing frontend dependencies..."
        npm install
        
        print_status "Frontend dependencies installed"
        print_info "Starting React development server on http://localhost:$FRONTEND_PORT"
        print_info "Press Ctrl+C to stop"
        
        npm start
        ;;
    3)
        echo -e "${BLUE}🚀 Starting Both Services...${NC}"
        echo ""
        print_info "This will start both backend and frontend in separate processes"
        print_info "You'll need to open a new terminal for the second service"
        echo ""
        
        # Start backend in background
        cd "$PROJECT_ROOT/backend"
        if [ ! -d "venv" ]; then
            python3 -m venv venv
        fi
        source venv/bin/activate
        pip install -r requirements.txt >/dev/null 2>&1
        
        print_status "Backend starting on http://localhost:$BACKEND_PORT"
        python app.py &
        BACKEND_PID=$!
        
        echo ""
        print_info "Backend started! Now open a new terminal and run:"
        echo "cd dashboard/frontend && npm install && npm start"
        echo ""
        print_info "Or use the production script: ./scripts/start.sh"
        echo ""
        
        # Wait for user to stop
        echo -e "${YELLOW}🛑 Press Ctrl+C to stop backend${NC}"
        trap "kill $BACKEND_PID 2>/dev/null || true; exit" SIGINT SIGTERM
        wait
        ;;
    4)
        echo -e "${BLUE}📦 Installing Dependencies...${NC}"
        
        # Backend dependencies
        cd "$PROJECT_ROOT/backend"
        if [ ! -d "venv" ]; then
            python3 -m venv venv
        fi
        source venv/bin/activate
        pip install -r requirements.txt
        print_status "Backend dependencies installed"
        
        # Frontend dependencies
        cd "$PROJECT_ROOT/frontend"
        npm install
        print_status "Frontend dependencies installed"
        
        print_status "All dependencies installed successfully!"
        ;;
    5)
        echo -e "${BLUE}📊 Checking Status...${NC}"
        
        # Check backend
        if curl -s http://localhost:$BACKEND_PORT/api/health >/dev/null; then
            print_status "Backend is running on http://localhost:$BACKEND_PORT"
        else
            print_warning "Backend is not running"
        fi
        
        # Check frontend
        if curl -s http://localhost:$FRONTEND_PORT >/dev/null; then
            print_status "Frontend is running on http://localhost:$FRONTEND_PORT"
        else
            print_warning "Frontend is not running"
        fi
        
        # Check ports
        if lsof -i :$BACKEND_PORT >/dev/null 2>&1; then
            print_info "Port $BACKEND_PORT is in use"
        else
            print_info "Port $BACKEND_PORT is available"
        fi
        
        if lsof -i :$FRONTEND_PORT >/dev/null 2>&1; then
            print_info "Port $FRONTEND_PORT is in use"
        else
            print_info "Port $FRONTEND_PORT is available"
        fi
        ;;
    6)
        echo -e "${BLUE}👋 Goodbye!${NC}"
        exit 0
        ;;
    *)
        print_error "Invalid option. Please choose 1-6."
        exit 1
        ;;
esac 