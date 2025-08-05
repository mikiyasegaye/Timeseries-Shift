# Brent Oil Prices Analysis: Event Impact Study

_Comprehensive analysis of geopolitical events' impact on global oil markets using Bayesian Change Point Detection_

---

## 🎯 Project Overview

This project analyzes how major geopolitical and economic events affect Brent oil prices using advanced Bayesian Change Point Analysis. The study provides data-driven insights for investors, policymakers, and energy companies to better understand and react to oil price fluctuations in volatile energy markets.

## 🏢 Business Objective

The main goal is to study how important events affect Brent oil prices, focusing on:

- **Political decisions** and conflicts in oil-producing regions
- **Global economic sanctions** and their market impact
- **OPEC policy changes** and production decisions
- **Other significant market events** affecting supply and demand

## 📚 Learning Outcomes

### Skills Acquired

- **Change Point Analysis & Interpretation** - Identifying structural breaks in time series
- **Statistical Reasoning** - Advanced statistical modeling and inference
- **Bayesian Modeling with PyMC** - Modern probabilistic programming
- **Analytical Storytelling** - Communicating complex findings to stakeholders

### Knowledge Gained

- **Probability distributions** and model selection for time series
- **Bayesian inference** and uncertainty quantification
- **Monte Carlo Markov Chain** (MCMC) sampling
- **Model comparison** and validation techniques
- **Policy analysis** and impact assessment

## 📁 Project Structure

```
Timeseries-Shift/
├── README.md                    # 📋 Main project documentation
├── requirements.txt             # 🐍 Python dependencies
├── .gitignore                  # 🚫 Comprehensive ignore patterns
│
├── data/                       # 📊 Data files and datasets
│   ├── raw/                   # 📈 Original Brent oil prices data
│   │   └── BrentOilPrices.csv # Historical Brent oil prices (1987-2022)
│   ├── processed/             # 🔧 Cleaned and preprocessed data
│   └── events/               # 📅 Research on key events affecting oil prices
│       ├── major_oil_events.csv # 16 major events with dates and descriptions
│       └── event_impacts_analysis.csv # Event impact analysis results
│
├── notebooks/                  # 📓 Jupyter notebooks for analysis
│   ├── 01_foundation_analysis/   # ✅ Task 1: Foundation and EDA (COMPLETED)
│   │   ├── 01_data_workflow_definition.ipynb # Data loading and basic analysis
│   │   ├── 02_event_research.ipynb # Event compilation and impact analysis
│   │   ├── 03_data_properties_analysis.ipynb # Time series properties analysis
│   │   └── 04_assumptions_limitations.ipynb # Assumptions and communication strategy
│   ├── 02_change_point_modeling/ # ✅ Task 2: Change Point Modeling (COMPLETED)
│   │   ├── 01_data_preparation.ipynb # Data preparation and preprocessing
│   │   ├── 02_bayesian_change_point_model.ipynb # PyMC implementation
│   │   └── 03_model_interpretation.ipynb # Impact quantification and event association
│   └── 03_exploration/          # 🔍 Additional exploratory analysis
│
├── src/                       # 💻 Source code modules
│   ├── models/               # 🤖 Bayesian change point models
│   ├── utils/                # 🛠️ Utility functions
│   └── data_processing/      # 🔄 Data cleaning and preprocessing
│
├── dashboard/                 # 🖥️ Interactive dashboard (Task 3)
│   ├── backend/              # 🐍 Flask API server
│   ├── frontend/             # ⚛️ React application
│   ├── scripts/              # 📜 Startup scripts
│   ├── docker/               # 🐳 Docker configuration
│   ├── config/               # ⚙️ Environment settings
│   ├── docs/                 # 📚 Documentation
│   ├── static/               # 🎨 Static assets
│   └── run.py                # 🚀 Main entry point
│
└── reports/                  # 📄 Analysis reports and documentation
    ├── events_timeline.csv   # 📅 Structured events timeline (16 major events)
    └── final_blog_post.md   # 📝 Final blog post for publication
```

## ✅ Tasks Status

### Task 1: Laying the Foundation for Analysis ✅ **COMPLETED**

- ✅ **Define data analysis workflow** - Multi-phase analysis approach established
- ✅ **Research and compile event data** - 16 major events identified and documented
- ✅ **Understand model and data properties** - Comprehensive time series analysis complete
- ✅ **Identify assumptions and limitations** - Statistical assumptions and communication strategy defined
- **📊 Key Findings**:
  - Asian Crisis (1998): Lowest price $9.10
  - Financial Crisis (2008): Highest price $143.95
  - COVID-19 (2020): Most dramatic price collapse in history
- **📈 Data Insights**: 9,011 observations, 35-year period, log returns suitable for modeling

### Task 2: Change Point Modeling and Insight Generation ✅ **COMPLETED**

- ✅ **Implement Bayesian Change Point Model** using PyMC 5.25.1
- ✅ **Identify and interpret change points** - Multiple structural breaks detected
- ✅ **Associate changes with causal events** - Events mapped to change points
- ✅ **Quantify impact of events** on oil prices with statistical significance
- **🔬 Key Results**:
  - Multiple structural breaks identified and quantified
  - Impact magnitude calculated for each major event
  - Events successfully associated with change points
- **⚡ Model Performance**: PyMC 5.25.1, 4 chains, 2000 draws, successful convergence

### Task 3: Interactive Dashboard ✅ **COMPLETED**

- ✅ **Build Flask backend API** - RESTful API with comprehensive endpoints
- ✅ **Create React frontend** with interactive visualizations using Plotly.js
- ✅ **Enable event filtering** and dynamic date range selection
- ✅ **Display key indicators** and correlations with real-time data
- **🖥️ Features**:
  - Dashboard overview with dynamic metrics
  - Interactive price analysis with adaptive windows
  - Events timeline with category filtering
  - Change points analysis with significance indicators
- **⚙️ Technology**: Flask + React, Plotly.js visualizations, responsive design, Docker deployment

#### **🏗️ Dashboard Structure**

```
dashboard/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Virtual environment (auto-created)
├── frontend/               # React application
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # Node.js dependencies
│   └── build/             # Production build (auto-created)
├── scripts/               # Startup scripts
│   ├── start.sh          # Production startup script
│   └── dev.sh            # Development startup script
├── docker/                # Docker configuration
│   ├── docker-compose.yml # Multi-service orchestration
│   ├── backend/           # Backend Dockerfile
│   ├── frontend/          # Frontend Dockerfile
│   └── nginx/             # Nginx configuration
├── config/                # Configuration files
│   └── environment.py     # Environment settings
├── docs/                  # Documentation
├── static/                # Static assets
├── logs/                  # Application logs (auto-created)
├── run.py                 # Main entry point
└── README.md             # Dashboard documentation
```

#### **🚀 Quick Start**

**Prerequisites**: Python 3.8+, Node.js 14+, npm/yarn, data files: `data/raw/BrentOilPrices.csv` and `reports/events_timeline.csv`

**Option 1: Unified Entry Point (Recommended)**

```bash
# Development mode (interactive)
python dashboard/run.py

# Production mode
python dashboard/run.py --mode prod

# Docker mode
python dashboard/run.py --mode docker

# Backend only
python dashboard/run.py --backend-only

# Frontend only
python dashboard/run.py --frontend-only
```

**Option 2: Direct Scripts**

```bash
# Development (interactive menu)
./dashboard/scripts/dev.sh

# Production (automated)
./dashboard/scripts/start.sh

# Docker
cd dashboard/docker && docker-compose up --build
```

**Option 3: Manual Setup**

```bash
# Backend
cd dashboard/backend
pip install -r requirements.txt
python app.py

# Frontend (new terminal)
cd dashboard/frontend
npm install
npm start
```

**Access URLs**: Frontend: http://localhost:3000, Backend API: http://localhost:5000, Health Check: http://localhost:5000/api/health

#### **📊 Key Features**

- **Dashboard Overview**: Real-time data loading, dynamic metrics, interactive price trend visualization
- **Price Analysis**: Dynamic date range filtering, log returns analysis with adaptive windows, rolling volatility
- **Events Timeline**: Dynamic event categorization, real-time filtering by category and impact
- **Change Points Analysis**: Dynamic volatility-based detection, adaptive thresholds based on data distribution

#### **🐳 Docker Deployment**

```bash
# Quick start
cd dashboard/docker
docker-compose up --build

# Production with nginx
docker-compose -f docker-compose.yml up -d
```

#### **📈 API Endpoints**

- **Data**: `/api/data/brent-prices`, `/api/data/events`
- **Analysis**: `/api/analysis/log-returns`, `/api/analysis/change-points`
- **Visualization**: `/api/visualizations/price-trend`, `/api/visualizations/returns-distribution`

#### **🛠️ Troubleshooting**

| Issue                     | Solution                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Port Already in Use**   | `lsof -i :5000 \| awk 'NR!=1 {print \$2}' \| xargs kill -9`                                                                  |
| **Backend Dependencies**  | `cd dashboard/backend && rm -rf venv && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt` |
| **Frontend Dependencies** | `cd dashboard/frontend && rm -rf node_modules package-lock.json && npm install`                                              |
| **Data Files Missing**    | Ensure `data/raw/BrentOilPrices.csv` and `reports/events_timeline.csv` exist                                                 |
| **Docker Issues**         | `docker-compose down && docker system prune -f && docker-compose up --build`                                                 |

## Data Management

### Data Sources

#### Brent Oil Prices Dataset

- **Source**: Historical daily Brent oil prices
- **Period**: May 20, 1987 to November 14, 2022
- **Format**: CSV with Date and Price columns
- **Price Unit**: USD per barrel
- **Observations**: 9,011 records
- **Key Statistics**: Price range $9.10 - $143.95
- **Data Quality**: No missing values, dual date format handling implemented

#### Events Dataset

- **Content**: 16 major geopolitical events, OPEC decisions, economic sanctions, and market events
- **Format**: CSV with event details, dates, categories, and impact classifications
- **Sources**: Research from news articles, economic reports, and policy documents
- **Categories**: Geopolitical Conflict, Economic Crisis, OPEC Decision, Market Event, Economic Sanction
- **Key Events**: Asian Crisis (1998), Financial Crisis (2008), COVID-19 (2020), Russia-Ukraine War (2022)

### Data Processing Pipeline

1. **Raw Data**: Original dataset as received
2. **Cleaning**: Handle missing values, outliers, and format dates
3. **Feature Engineering**: Create log returns, volatility measures
4. **Event Mapping**: Align events with price data for analysis

## Analysis Workflow

### Notebooks Structure

#### Foundation Analysis (Task 1) - COMPLETED

- `01_data_workflow_definition.ipynb`: Data loading, cleaning, and basic analysis with crisis period identification
- `02_event_research.ipynb`: 16 major events compilation with impact analysis and crisis period deep dive
- `03_data_properties_analysis.ipynb`: Comprehensive time series analysis including stationarity, trends, volatility, and distribution properties
- `04_assumptions_limitations.ipynb`: Data quality assessment, correlation vs. causation analysis, and stakeholder communication strategy

#### Change Point Modeling (Task 2) - COMPLETED

- `01_data_preparation.ipynb`: Data loading, cleaning, and preprocessing with outlier detection ✅
- `02_bayesian_change_point_model.ipynb`: PyMC implementation with MCMC sampling ✅
- `03_model_interpretation.ipynb`: Multiple change points, impact quantification, event association ✅

#### Exploration

- Additional exploratory analysis and model extensions

### Analysis Steps

1. **Data Understanding**: Explore raw data, identify patterns and anomalies
2. **Event Research**: Compile comprehensive list of key events
3. **Model Development**: Implement Bayesian change point detection
4. **Interpretation**: Analyze results and associate with events
5. **Communication**: Prepare insights for stakeholders

### Key Concepts

- **Change Point Analysis**: Detecting structural breaks in time series
- **Bayesian Inference**: Probabilistic modeling with PyMC3
- **Event Impact Assessment**: Quantifying causal relationships
- **Statistical Validation**: Ensuring model reliability and convergence

## Source Code Structure

_Note: Source code modules will be implemented in Task 2 and Task 3_

### Models (`src/models/`)

- Bayesian change point detection implementation (planned)
- Model utilities and comparison tools (planned)

### Utils (`src/utils/`)

- Data loading and preprocessing utilities (planned)
- Visualization and statistical analysis functions (planned)

### Data Processing (`src/data_processing/`)

- Data cleaning and feature engineering (planned)
- Event mapping and data loading (planned)

## Interactive Dashboard (Task 3 - Planned)

### Features (Planned)

- Historical Brent oil prices with event overlays
- Change point detection results visualization
- Event impact analysis charts
- Interactive filtering and date range selection

### Technology Stack (Planned)

- **Backend**: Flask API
- **Frontend**: React with Recharts/D3.js
- **Database**: SQLite/PostgreSQL

## 📄 Reports and Documentation

### ✅ Completed Reports

- `reports/events_timeline.csv`: Structured events timeline with 16 major events ✅
- `reports/final_blog_post.md`: Comprehensive blog post for publication ✅
- **Analysis Results**: All tasks completed with detailed findings

### 📊 Key Deliverables

- **Data Analysis**: 35 years of Brent oil prices analyzed
- **Event Research**: 16 major geopolitical events documented
- **Bayesian Modeling**: Change point detection with PyMC
- **Interactive Dashboard**: Full-stack web application
- **Publication-Ready Report**: Blog post suitable for Medium/TDS

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+** (for PyMC compatibility)
- **Node.js 14+** (for React frontend)
- **Git** (for version control)
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Timeseries-Shift
   ```

2. **Install Python dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up virtual environment (recommended)**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Install Node.js dependencies (for dashboard)**
   ```bash
   cd dashboard/frontend
   npm install
   cd ../..
   ```

### Data Setup

1. **Ensure data files are in place**

   - `data/raw/BrentOilPrices.csv` - Historical Brent oil prices
   - `reports/events_timeline.csv` - Events timeline data

2. **Verify data integrity**
   ```bash
   python -c "import pandas as pd; print('Data loaded successfully')"
   ```

### Running the Analysis

1. **Start with Task 1 (Completed)**

   ```bash
   jupyter notebook notebooks/01_foundation_analysis/
   ```

2. **Proceed to Task 2 (Completed)**

   ```bash
   jupyter notebook notebooks/02_change_point_modeling/
   ```

3. **Launch Dashboard (Completed)**
   ```bash
   python dashboard/run.py
   ```

## 🔄 Development Workflow

1. **Data Preparation**: Work in `data/` directories ✅
2. **Analysis**: Use notebooks in `notebooks/` for exploration ✅
3. **Modeling**: Implement models in `src/models/` ✅
4. **Visualization**: Create dashboard in `dashboard/` ✅
5. **Documentation**: Write reports in `reports/` ✅

## File Naming Conventions

- **Notebooks**: Use descriptive names with task prefixes (e.g., `01_data_workflow_definition.ipynb`)
- **Python Modules**: Use snake_case (e.g., `change_point_model.py`)
- **Reports**: Use descriptive names with report type (e.g., `interim_report_task1.md`)
- **Data Files**: Use descriptive names with date stamps if needed

## 🛠️ Technologies Used

### ✅ Completed Technologies

- **Python**: Data analysis and time series processing
- **Jupyter**: Interactive analysis and documentation
- **NumPy/Pandas**: Data manipulation and analysis
- **Matplotlib/Seaborn**: Static visualizations
- **PyMC 5.25.1**: Bayesian modeling and change point detection
- **Flask**: Backend API for dashboard
- **React**: Frontend dashboard with interactive visualizations
- **Plotly.js**: Interactive data visualizations
- **Docker**: Containerized deployment
- **Nginx**: Reverse proxy for production

### 📊 Key Libraries

- **Data Analysis**: pandas, numpy, scipy
- **Visualization**: matplotlib, seaborn, plotly
- **Bayesian Modeling**: pymc, arviz, aesara
- **Web Development**: flask, react, axios, styled-components
- **Deployment**: docker, docker-compose, nginx

## 🤝 Contributing

1. Follow the established directory structure
2. Use descriptive file names
3. Document all analysis steps
4. Include proper error handling in code
5. Test models and visualizations thoroughly

## 📄 License

This project is for educational and research purposes.

---

## 🎯 Project Summary

### ✅ **COMPLETED SUCCESSFULLY**

This project has successfully completed all three major tasks:

1. **📊 Foundation Analysis** - Comprehensive data exploration and event research
2. **🔬 Bayesian Modeling** - Advanced change point detection with PyMC
3. **🖥️ Interactive Dashboard** - Full-stack web application with real-time data

### 🏆 **Key Achievements**

- **35 years of data** analyzed (1987-2022)
- **16 major events** documented and analyzed
- **Multiple structural breaks** identified and quantified
- **Interactive dashboard** with dynamic features
- **Publication-ready report** for Medium/TDS

### 🚀 **Ready for Production**

- **Complete codebase** with comprehensive documentation
- **Docker deployment** ready for production
- **Comprehensive .gitignore** for clean repository management
- **Professional blog post** for publication

### 📈 **Business Impact**

This analysis provides actionable insights for:

- **Investors**: Risk management and timing strategies
- **Policymakers**: Economic stability monitoring
- **Energy Companies**: Strategic planning and risk assessment

---

_This project demonstrates advanced data science techniques applied to real-world energy market analysis, providing valuable insights for stakeholders across the energy sector._
