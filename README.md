# Brent Oil Prices Analysis: Event Impact Study

## Project Overview

This project analyzes how major geopolitical and economic events affect Brent oil prices using Bayesian Change Point Analysis. The study aims to provide data-driven insights for investors, policymakers, and energy companies to better understand and react to oil price fluctuations.

## Business Objective

The main goal is to study how important events affect Brent oil prices, focusing on:

- Political decisions and conflicts in oil-producing regions
- Global economic sanctions
- OPEC policy changes
- Other significant market events

## Learning Outcomes

### Skills

- Change Point Analysis & Interpretation
- Statistical Reasoning
- Using PyMC3 for Bayesian modeling
- Analytical Storytelling with Data

### Knowledge

- Probability distributions and model selection
- Bayesian inference
- Monte Carlo Markov Chain
- Model comparison
- Policy analysis

## Project Structure

```
Timeseries-Shift/
├── README.md                    # Main project documentation
├── requirements.txt             # Python dependencies
│
├── data/                       # Data files and datasets
│   ├── raw/                   # Original Brent oil prices data
│   │   └── BrentOilPrices.csv # Historical Brent oil prices (1987-2022)
│   ├── processed/             # Cleaned and preprocessed data
│   └── events/               # Research on key events affecting oil prices
│       ├── major_oil_events.csv # 16 major events with dates and descriptions
│       └── event_impacts_analysis.csv # Event impact analysis results
│
├── notebooks/                  # Jupyter notebooks for analysis
│   ├── 01_foundation_analysis/   # Task 1: Foundation and EDA
│   │   ├── 01_data_workflow_definition.ipynb # Data loading and basic analysis
│   │   ├── 02_event_research.ipynb # Event compilation and impact analysis
│   │   ├── 03_data_properties_analysis.ipynb # Time series properties analysis
│   │   └── 04_assumptions_limitations.ipynb # Assumptions and communication strategy
│   ├── 02_change_point_modeling/ # Task 2: Change Point Modeling
│   └── 03_exploration/          # Additional exploratory analysis
│
├── src/                       # Source code modules
│   ├── models/               # Bayesian change point models
│   ├── utils/                # Utility functions
│   └── data_processing/      # Data cleaning and preprocessing
│
├── dashboard/                 # Interactive dashboard (Task 3)
│   ├── backend/              # Flask API
│   ├── frontend/             # React frontend
│   └── static/               # Static assets
│
└── reports/                  # Analysis reports and documentation
    └── events_timeline.csv   # Structured events timeline (16 major events)
```

## Tasks

### Task 1: Laying the Foundation for Analysis (COMPLETED)

- Define data analysis workflow
- Research and compile event data (16 major events identified)
- Understand model and data properties (time series analysis complete)
- Identify assumptions and limitations
- **Key Findings**: Asian Crisis (1998) lowest price $9.10, Financial Crisis (2008) highest price $143.95, COVID-19 (2020) dramatic collapse
- **Data Insights**: 9,011 observations, 35-year period, log returns suitable for modeling

### Task 2: Change Point Modeling and Insight Generation

- Implement Bayesian Change Point Model using PyMC3
- Identify and interpret change points
- Associate changes with causal events
- Quantify impact of events on oil prices

### Task 3: Interactive Dashboard

- Build Flask backend API
- Create React frontend with interactive visualizations
- Enable event filtering and date range selection
- Display key indicators and correlations

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

#### Change Point Modeling (Task 2)

- `01_data_preparation.ipynb`: Data cleaning and preprocessing
- `02_bayesian_change_point_model.ipynb`: PyMC3 implementation
- `03_model_interpretation.ipynb`: Analyze model outputs and change points
- `04_event_association.ipynb`: Link change points to causal events
- `05_impact_quantification.ipynb`: Quantify event impacts on prices

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

## Reports and Documentation

### Current Reports

- `reports/events_timeline.csv`: Structured events timeline with 16 major events (completed)

### Planned Reports (Tasks 2 & 3)

- Task 2 analysis results and change point findings
- Final comprehensive analysis summary
- Executive summary for stakeholders
- Technical methodology documentation

## Getting Started

### Prerequisites

- Python 3.8+
- Git

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

3. **Start with Task 1 (Completed)**

   ```bash
   jupyter notebook notebooks/01_foundation_analysis/
   ```

4. **Proceed to Task 2 (Next)**

   ```bash
   jupyter notebook notebooks/02_change_point_modeling/
   ```

## Development Workflow

1. **Data Preparation**: Work in `data/` directories ✅
2. **Analysis**: Use notebooks in `notebooks/` for exploration ✅
3. **Modeling**: Implement models in `src/models/` (Task 2)
4. **Visualization**: Create dashboard in `dashboard/` (Task 3)
5. **Documentation**: Write reports in `reports/` ✅

## File Naming Conventions

- **Notebooks**: Use descriptive names with task prefixes (e.g., `01_data_workflow_definition.ipynb`)
- **Python Modules**: Use snake_case (e.g., `change_point_model.py`)
- **Reports**: Use descriptive names with report type (e.g., `interim_report_task1.md`)
- **Data Files**: Use descriptive names with date stamps if needed

## Technologies Used

### Current (Task 1 - Completed)

- **Python**: Data analysis and time series processing
- **Jupyter**: Interactive analysis and documentation
- **NumPy/Pandas**: Data manipulation and analysis
- **Matplotlib/Seaborn**: Static visualizations
- **PyMC**: Bayesian modeling (Task 2)

### Planned (Tasks 2 & 3)

- **Flask**: Backend API for dashboard
- **React**: Frontend dashboard with interactive visualizations
- **Recharts/D3.js**: Data visualization components
- **Plotly/Bokeh**: Interactive visualizations

## Contributing

1. Follow the established directory structure
2. Use descriptive file names
3. Document all analysis steps
4. Include proper error handling in code
5. Test models and visualizations thoroughly

## License

This project is for educational and research purposes.
