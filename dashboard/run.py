#!/usr/bin/env python3
"""
Brent Oil Dashboard - Main Entry Point
This script provides a unified interface to start the dashboard
"""

import argparse
import subprocess
import sys
import os
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description='Brent Oil Dashboard')
    parser.add_argument('--mode', choices=['dev', 'prod', 'docker'],
                        default='dev', help='Run mode (default: dev)')
    parser.add_argument('--backend-only', action='store_true',
                        help='Start only the backend')
    parser.add_argument('--frontend-only', action='store_true',
                        help='Start only the frontend')
    parser.add_argument('--install-deps', action='store_true',
                        help='Install dependencies only')

    args = parser.parse_args()

    # Get project root
    project_root = Path(__file__).parent

    if args.mode == 'docker':
        print("🐳 Starting with Docker...")
        os.chdir(project_root / "docker")
        subprocess.run(["docker-compose", "up", "--build"], check=True)

    elif args.mode == 'prod':
        print("🚀 Starting in production mode...")
        script_path = project_root / "scripts" / "start.sh"
        subprocess.run(["bash", str(script_path)], check=True)

    else:  # dev mode
        print("🔧 Starting in development mode...")
        script_path = project_root / "scripts" / "dev.sh"

        if args.backend_only:
            subprocess.run(["bash", str(script_path), "1"], check=True)
        elif args.frontend_only:
            subprocess.run(["bash", str(script_path), "2"], check=True)
        elif args.install_deps:
            subprocess.run(["bash", str(script_path), "4"], check=True)
        else:
            subprocess.run(["bash", str(script_path)], check=True)


if __name__ == "__main__":
    main()
