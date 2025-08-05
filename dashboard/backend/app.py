from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
from datetime import datetime
import plotly.graph_objects as go
import plotly.express as px
from plotly.utils import PlotlyJSONEncoder

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Data loading functions


def load_brent_data():
    """Load Brent oil prices data"""
    try:
        df = pd.read_csv('../../data/raw/BrentOilPrices.csv')
        # Parse dates (handle dual format)

        def parse_date(date_str):
            try:
                # Try DD-Mon-YY format first
                return pd.to_datetime(date_str, format='%d-%b-%y')
            except:
                # Try "Mon DD, YYYY" format
                return pd.to_datetime(date_str, format='%b %d, %Y')

        df['Date'] = df['Date'].apply(parse_date)
        df.set_index('Date', inplace=True)
        return df
    except Exception as e:
        print(f"Error loading Brent data: {e}")
        return None


def load_events_data():
    """Load events timeline data"""
    try:
        events_df = pd.read_csv('../../reports/events_timeline.csv')
        events_df['Date'] = pd.to_datetime(events_df['Date'])
        return events_df
    except Exception as e:
        print(f"Error loading events data: {e}")
        return None


def calculate_log_returns(df):
    """Calculate log returns from price data"""
    return np.log(df['Price'] / df['Price'].shift(1)).dropna()

# API Routes


@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Dashboard API is running'})


@app.route('/api/data/brent-prices')
def get_brent_prices():
    """Get Brent oil prices data"""
    df = load_brent_data()
    if df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    # Convert to JSON-friendly format
    data = {
        'dates': df.index.strftime('%Y-%m-%d').tolist(),
        'prices': df['Price'].tolist(),
        'summary': {
            'start_date': df.index.min().strftime('%Y-%m-%d'),
            'end_date': df.index.max().strftime('%Y-%m-%d'),
            'total_observations': len(df),
            'min_price': float(df['Price'].min()),
            'max_price': float(df['Price'].max()),
            'mean_price': float(df['Price'].mean()),
            'std_price': float(df['Price'].std())
        }
    }
    return jsonify(data)


@app.route('/api/data/events')
def get_events():
    """Get events timeline data"""
    events_df = load_events_data()
    if events_df is None:
        return jsonify({'error': 'Failed to load events data'}), 500

    events = []
    for _, row in events_df.iterrows():
        events.append({
            'date': row['Date'].strftime('%Y-%m-%d'),
            'event': row['Event'],
            'category': row['Category'],
            'description': row['Description'],
            'expected_impact': row['Expected_Impact'],
            'observed_impact': row['Data_Validation']
        })

    return jsonify({'events': events})


@app.route('/api/analysis/log-returns')
def get_log_returns():
    """Get log returns analysis"""
    df = load_brent_data()
    if df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    log_returns = calculate_log_returns(df)

    data = {
        'dates': log_returns.index.strftime('%Y-%m-%d').tolist(),
        'log_returns': log_returns.tolist(),
        'summary': {
            'mean': float(log_returns.mean()),
            'std': float(log_returns.std()),
            'min': float(log_returns.min()),
            'max': float(log_returns.max()),
            'skewness': float(log_returns.skew()),
            'kurtosis': float(log_returns.kurtosis())
        }
    }
    return jsonify(data)


@app.route('/api/analysis/change-points')
def get_change_points():
    """Get change points analysis (dynamic version)"""
    df = load_brent_data()
    if df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    # Calculate dynamic change points based on volatility
    log_returns = calculate_log_returns(df)

    # Dynamic window size based on data length
    window_size = min(30, len(log_returns) // 10)
    rolling_vol = log_returns.rolling(window=window_size).std()

    # Dynamic threshold based on data distribution
    high_vol_threshold = rolling_vol.quantile(0.95)
    change_points = rolling_vol[rolling_vol > high_vol_threshold].index

    # Dynamic number of change points (max 15 or 5% of data)
    max_change_points = min(15, len(change_points))
    top_change_points = change_points[:max_change_points]

    change_points_data = []
    for cp_date in top_change_points:
        change_points_data.append({
            'date': cp_date.strftime('%Y-%m-%d'),
            'volatility': float(rolling_vol.loc[cp_date]),
            'price': float(df.loc[cp_date, 'Price']),
            'significance': 'High' if rolling_vol.loc[cp_date] > high_vol_threshold * 1.2 else 'Medium'
        })

    return jsonify({
        'change_points': change_points_data,
        'total_change_points': len(change_points),
        'window_size': window_size,
        'threshold': float(high_vol_threshold)
    })


@app.route('/api/visualizations/price-trend')
def get_price_trend_plot():
    """Generate price trend visualization"""
    df = load_brent_data()
    if df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    # Create Plotly figure
    fig = go.Figure()

    fig.add_trace(go.Scatter(
        x=df.index,
        y=df['Price'],
        mode='lines',
        name='Brent Oil Price',
        line=dict(color='#1f77b4', width=2)
    ))

    fig.update_layout(
        title='Brent Oil Prices (1987-2022)',
        xaxis_title='Date',
        yaxis_title='Price (USD)',
        template='plotly_white',
        height=500
    )

    return jsonify(fig.to_dict())


@app.route('/api/visualizations/returns-distribution')
def get_returns_distribution():
    """Generate log returns distribution visualization"""
    df = load_brent_data()
    if df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    log_returns = calculate_log_returns(df)

    fig = go.Figure()

    fig.add_trace(go.Histogram(
        x=log_returns,
        nbinsx=50,
        name='Log Returns',
        marker_color='#ff7f0e'
    ))

    fig.update_layout(
        title='Distribution of Log Returns',
        xaxis_title='Log Returns',
        yaxis_title='Frequency',
        template='plotly_white',
        height=400
    )

    return jsonify(fig.to_dict())


@app.route('/api/visualizations/events-timeline')
def get_events_timeline():
    """Generate events timeline visualization"""
    df = load_brent_data()
    events_df = load_events_data()

    if df is None or events_df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    fig = go.Figure()

    # Add price line
    fig.add_trace(go.Scatter(
        x=df.index,
        y=df['Price'],
        mode='lines',
        name='Brent Oil Price',
        line=dict(color='#1f77b4', width=1)
    ))

    # Add events as vertical lines
    for _, event in events_df.iterrows():
        fig.add_vline(
            x=event['Date'],
            line_dash="dash",
            line_color="red",
            annotation_text=event['Event'][:20] + "...",
            annotation_position="top right"
        )

    fig.update_layout(
        title='Brent Oil Prices with Major Events',
        xaxis_title='Date',
        yaxis_title='Price (USD)',
        template='plotly_white',
        height=600
    )

    return jsonify(fig.to_dict())


@app.route('/api/filters/date-range')
def get_date_range():
    """Get available date range for filtering"""
    df = load_brent_data()
    if df is None:
        return jsonify({'error': 'Failed to load data'}), 500

    return jsonify({
        'min_date': df.index.min().strftime('%Y-%m-%d'),
        'max_date': df.index.max().strftime('%Y-%m-%d')
    })


@app.route('/api/filters/events-by-category')
def get_events_by_category():
    """Get events grouped by category"""
    events_df = load_events_data()
    if events_df is None:
        return jsonify({'error': 'Failed to load events data'}), 500

    categories = events_df['Category'].unique().tolist()
    return jsonify({'categories': categories})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
