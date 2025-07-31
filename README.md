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
│   ├── processed/             # Cleaned and preprocessed data
│   └── events/               # Research on key events affecting oil prices
│
├── notebooks/                  # Jupyter notebooks for analysis
│   ├── 01_foundation_analysis/   # Task 1: Foundation and EDA
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
```

## Tasks

### Task 1: Laying the Foundation for Analysis

- Define data analysis workflow
- Research and compile event data
- Understand model and data properties
- Identify assumptions and limitations

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
- **Period**: May 20, 1987 to September 30, 2022
- **Format**: CSV with Date and Price columns
- **Price Unit**: USD per barrel

#### Events Dataset

- **Content**: Major geopolitical events, OPEC decisions, economic sanctions
- **Format**: CSV with event details, dates, and impact classifications
- **Sources**: Research from news articles, economic reports, and policy documents

### Data Processing Pipeline

1. **Raw Data**: Original dataset as received
2. **Cleaning**: Handle missing values, outliers, and format dates
3. **Feature Engineering**: Create log returns, volatility measures
4. **Event Mapping**: Align events with price data for analysis

## Analysis Workflow

### Notebooks Structure

#### Foundation Analysis (Task 1)

- `01_data_workflow_definition.ipynb`: Define analysis workflow and methodology
- `02_event_research.ipynb`: Research and compile key events affecting oil prices
- `03_data_properties_analysis.ipynb`: Analyze time series properties and stationarity
- `04_assumptions_limitations.ipynb`: Document assumptions and limitations

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

### Models (`src/models/`)

- `change_point_model.py`: Bayesian change point detection implementation
- `model_utils.py`: Helper functions for model fitting and evaluation
- `model_comparison.py`: Tools for comparing different model specifications

### Utils (`src/utils/`)

- `data_utils.py`: Data loading and preprocessing utilities
- `visualization.py`: Plotting and visualization functions
- `statistics.py`: Statistical analysis and testing functions
- `event_utils.py`: Event data processing and mapping functions

### Data Processing (`src/data_processing/`)

- `cleaner.py`: Data cleaning and validation
- `feature_engineering.py`: Create derived features (log returns, volatility)
- `event_mapper.py`: Align events with price data
- `data_loader.py`: Load and cache datasets

### Key Modules Usage

#### Change Point Model

```python
from src.models.change_point_model import BayesianChangePointModel
```

#### Data Processing

```python
from src.data_processing.cleaner import clean_oil_prices
from src.data_processing.feature_engineering import calculate_log_returns
```

#### Utilities

```python
from src.utils.visualization import plot_price_series
from src.utils.statistics import test_stationarity
```

## Interactive Dashboard

### Features

#### Interactive Visualizations

- Historical Brent oil prices with event overlays
- Change point detection results
- Event impact analysis charts
- Volatility clustering visualization

#### User Interface

- Date range selection and filtering
- Event category filtering
- Interactive tooltips and annotations
- Responsive design for multiple devices

#### Data Exploration

- Drill-down capabilities for specific events
- Comparison tools for different time periods
- Export functionality for reports

### Technology Stack

#### Backend

- **Flask**: Python web framework
- **SQLite/PostgreSQL**: Data storage
- **Pandas**: Data processing
- **NumPy**: Numerical computations

#### Frontend

- **React**: JavaScript framework
- **Recharts/D3.js**: Data visualization
- **Material-UI**: UI components
- **Axios**: HTTP client

### API Endpoints

- `GET /api/prices`: Historical oil prices data
- `GET /api/events`: Key events affecting oil prices
- `GET /api/change-points`: Change point detection results
- `GET /api/impact-analysis`: Event impact quantification

## Reports and Documentation

### Analysis Reports

- `task1_report.md`: Task 1 findings and methodology
- `task2_report.md`: Change point analysis results
- `final_report.md`: Comprehensive analysis summary
- `executive_summary.md`: High-level insights for stakeholders

### Technical Documentation

- `methodology.md`: Detailed methodology and approach
- `model_specification.md`: Bayesian model details
- `data_dictionary.md`: Data field definitions and sources
- `assumptions_limitations.md`: Analysis constraints and caveats

### Presentations

- `presentation_slides.pptx`: PowerPoint presentation
- `dashboard_demo.md`: Dashboard demonstration guide
- `stakeholder_briefing.md`: Executive briefing document

### Visualizations

- `figures/`: High-resolution charts and graphs
- `tables/`: Data tables and summary statistics
- `interactive/`: Interactive visualization exports

### Report Templates

#### Executive Summary Template

1. **Business Context**: Oil market volatility and decision-making challenges
2. **Key Findings**: Most significant events and their impacts
3. **Recommendations**: Actionable insights for stakeholders
4. **Methodology**: Brief overview of analytical approach

#### Technical Report Template

1. **Introduction**: Problem statement and objectives
2. **Data and Methods**: Data sources and analytical approach
3. **Results**: Change point detection and event association
4. **Discussion**: Interpretation and implications
5. **Conclusions**: Summary and future work

### Key Deliverables

#### For Investors

- Event impact quantification
- Risk assessment framework
- Investment timing recommendations

#### For Policymakers

- Policy effectiveness analysis
- Economic stability implications
- Energy security considerations

#### For Energy Companies

- Supply chain risk assessment
- Operational planning insights
- Cost management strategies

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js (for dashboard frontend)
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

3. **Start with Task 1**

   ```bash
   jupyter notebook notebooks/01_foundation_analysis/
   ```

4. **Run the dashboard (Task 3)**

   ```bash
   # Backend
   cd dashboard/backend
   python app.py

   # Frontend (in another terminal)
   cd dashboard/frontend
   npm install
   npm start
   ```

## Development Workflow

1. **Data Preparation**: Work in `data/` directories
2. **Analysis**: Use notebooks in `notebooks/` for exploration
3. **Modeling**: Implement models in `src/models/`
4. **Visualization**: Create dashboard in `dashboard/`
5. **Documentation**: Write reports in `reports/`

## File Naming Conventions

- **Notebooks**: Use descriptive names with task prefixes (e.g., `01_data_preparation.ipynb`)
- **Python Modules**: Use snake_case (e.g., `change_point_model.py`)
- **Reports**: Use descriptive names with report type (e.g., `task1_report.md`)
- **Data Files**: Use descriptive names with date stamps if needed

## Technologies Used

- **Python**: Data analysis, PyMC/PyMC3 for Bayesian modeling
- **Jupyter**: Interactive analysis and documentation
- **Flask**: Backend API for dashboard
- **React**: Frontend dashboard with interactive visualizations
- **Recharts/D3.js**: Data visualization components
- **NumPy/Pandas**: Data manipulation and analysis
- **Matplotlib/Seaborn**: Static visualizations
- **Plotly/Bokeh**: Interactive visualizations

## Contributing

1. Follow the established directory structure
2. Use descriptive file names
3. Document all analysis steps
4. Include proper error handling in code
5. Test models and visualizations thoroughly

## License

This project is for educational and research purposes.
