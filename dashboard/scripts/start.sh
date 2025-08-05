#!/bin/bash

# Brent Oil Dashboard - Production Start Script
# This script starts the dashboard in production mode

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

echo -e "${BLUE}🎯 Brent Oil Analysis Dashboard${NC}"
echo -e "${BLUE}=====================================${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is available
port_available() {
    ! lsof -i :$1 >/dev/null 2>&1
}

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

# Check dependencies
echo -e "${BLUE}🔍 Checking dependencies...${NC}"

# Check Python
if ! command_exists python3; then
    print_error "Python 3 not found. Please install Python 3.8+"
    exit 1
else
    print_status "Python 3 found: $(python3 --version)"
fi

# Check Node.js
if ! command_exists node; then
    print_error "Node.js not found. Please install Node.js 14+"
    exit 1
else
    print_status "Node.js found: $(node --version)"
fi

# Check npm
if ! command_exists npm; then
    print_error "npm not found. Please install npm"
    exit 1
else
    print_status "npm found: $(npm --version)"
fi

# Check data files
echo -e "${BLUE}📊 Checking data files...${NC}"

if [ -f "$PROJECT_ROOT/../../data/raw/BrentOilPrices.csv" ]; then
    print_status "BrentOilPrices.csv found"
else
    print_error "BrentOilPrices.csv not found in data/raw/"
    exit 1
fi

if [ -f "$PROJECT_ROOT/../../reports/events_timeline.csv" ]; then
    print_status "events_timeline.csv found"
else
    print_error "events_timeline.csv not found in reports/"
    exit 1
fi

# Check ports
echo -e "${BLUE}🔌 Checking ports...${NC}"

if ! port_available $BACKEND_PORT; then
    print_warning "Port $BACKEND_PORT is in use. Attempting to kill process..."
    kill -9 $(lsof -t -i:$BACKEND_PORT) 2>/dev/null || true
    sleep 2
fi

if ! port_available $FRONTEND_PORT; then
    print_warning "Port $FRONTEND_PORT is in use. Attempting to kill process..."
    kill -9 $(lsof -t -i:$FRONTEND_PORT) 2>/dev/null || true
    sleep 2
fi

print_status "Ports $BACKEND_PORT and $FRONTEND_PORT are available"

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd "$PROJECT_ROOT/backend"
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt >/dev/null 2>&1
print_status "Backend dependencies installed"

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd "$PROJECT_ROOT/frontend"
npm install --silent >/dev/null 2>&1
print_status "Frontend dependencies installed"

# Start backend
echo -e "${BLUE}🚀 Starting backend server...${NC}"
cd "$PROJECT_ROOT/backend"
source venv/bin/activate
python app.py &
BACKEND_PID=$!
sleep 5

# Check if backend started successfully
if curl -s http://localhost:$BACKEND_PORT/api/health >/dev/null; then
    print_status "Backend started successfully on http://localhost:$BACKEND_PORT"
else
    print_error "Failed to start backend"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Start frontend
echo -e "${BLUE}🚀 Starting frontend server...${NC}"
cd "$PROJECT_ROOT/frontend"
npm start &
FRONTEND_PID=$!
sleep 10

# Check if frontend started successfully
if curl -s http://localhost:$FRONTEND_PORT >/dev/null; then
    print_status "Frontend started successfully on http://localhost:$FRONTEND_PORT"
else
    print_error "Failed to start frontend"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit 1
fi

echo -e "${GREEN}🎉 Dashboard started successfully!${NC}"
echo -e "${BLUE}📊 Backend API: http://localhost:$BACKEND_PORT${NC}"
echo -e "${BLUE}🌐 Frontend: http://localhost:$FRONTEND_PORT${NC}"
echo -e "${BLUE}💡 Opening dashboard in browser...${NC}"

# Open dashboard in browser
if command_exists open; then
    open http://localhost:$FRONTEND_PORT
elif command_exists xdg-open; then
    xdg-open http://localhost:$FRONTEND_PORT
else
    print_warning "Could not open browser automatically. Please visit http://localhost:$FRONTEND_PORT"
fi

echo -e "${YELLOW}🛑 Press Ctrl+C to stop the dashboard${NC}"

# Function to cleanup on exit
cleanup() {
    echo -e "${YELLOW}🛑 Stopping dashboard...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    print_status "Dashboard stopped"
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Keep script running
wait 