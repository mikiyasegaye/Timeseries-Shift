import React, { useState } from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";

const AnalysisContainer = styled.div`
  padding: 2rem;
`;

const AnalysisTitle = styled.h1`
  margin: 0 0 2rem 0;
  color: #2c3e50;
  font-size: 2rem;
`;

const FilterContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${(props) => props.color || "#3498db"};
`;

const StatTitle = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
`;

const PriceAnalysis = ({ data }) => {
  const [dateRange, setDateRange] = useState({
    start: data.brentPrices?.summary?.start_date || "1987-05-20",
    end: data.brentPrices?.summary?.end_date || "2022-11-14",
  });

  if (!data.brentPrices || !data.logReturns) {
    return <div>Loading price analysis data...</div>;
  }

  const { summary } = data.brentPrices;
  const logReturnsSummary = data.logReturns.summary;

  // Filter data based on date range
  const filteredDates = data.brentPrices.dates.filter(
    (date) => date >= dateRange.start && date <= dateRange.end
  );
  const filteredPrices = data.brentPrices.prices.filter(
    (_, index) =>
      data.brentPrices.dates[index] >= dateRange.start &&
      data.brentPrices.dates[index] <= dateRange.end
  );

  // Create price trend chart
  const priceChartData = [
    {
      x: filteredDates,
      y: filteredPrices,
      type: "scatter",
      mode: "lines",
      name: "Brent Oil Price",
      line: { color: "#3498db", width: 2 },
    },
  ];

  const priceChartLayout = {
    title: "Brent Oil Price Trend",
    xaxis: { title: "Date" },
    yaxis: { title: "Price (USD)" },
    height: 500,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  // Create log returns chart
  const returnsChartData = [
    {
      x: data.logReturns.dates,
      y: data.logReturns.log_returns,
      type: "scatter",
      mode: "lines",
      name: "Log Returns",
      line: { color: "#e74c3c", width: 1 },
    },
  ];

  const returnsChartLayout = {
    title: "Log Returns Over Time",
    xaxis: { title: "Date" },
    yaxis: { title: "Log Returns" },
    height: 400,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  // Create volatility chart with dynamic window size
  const volatilityData = [];
  const windowSize = Math.min(
    30,
    Math.floor(data.logReturns.log_returns.length / 10)
  );
  for (let i = windowSize; i < data.logReturns.log_returns.length; i++) {
    const window = data.logReturns.log_returns.slice(i - windowSize, i);
    const volatility =
      Math.sqrt(252) *
      Math.sqrt(window.reduce((sum, ret) => sum + ret * ret, 0) / windowSize);
    volatilityData.push(volatility);
  }

  const volatilityChartData = [
    {
      x: data.logReturns.dates.slice(windowSize),
      y: volatilityData,
      type: "scatter",
      mode: "lines",
      name: "30-Day Rolling Volatility",
      line: { color: "#f39c12", width: 2 },
    },
  ];

  const volatilityChartLayout = {
    title: `${windowSize}-Day Rolling Volatility (Annualized)`,
    xaxis: { title: "Date" },
    yaxis: { title: "Volatility" },
    height: 400,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  return (
    <AnalysisContainer>
      <AnalysisTitle>Price Analysis</AnalysisTitle>

      <FilterContainer>
        <FilterTitle>Date Range Filter</FilterTitle>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Start Date</FilterLabel>
            <FilterInput
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              min={summary.start_date}
              max={summary.end_date}
            />
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>End Date</FilterLabel>
            <FilterInput
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              min={summary.start_date}
              max={summary.end_date}
            />
          </FilterGroup>
        </FilterGrid>
      </FilterContainer>

      <StatsContainer>
        <StatCard color="#3498db">
          <StatTitle>Price Statistics</StatTitle>
          <StatValue>${summary.mean_price.toFixed(2)}</StatValue>
          <div>Mean Price</div>
        </StatCard>
        <StatCard color="#e74c3c">
          <StatTitle>Price Range</StatTitle>
          <StatValue>${summary.max_price.toFixed(2)}</StatValue>
          <div>Maximum Price</div>
        </StatCard>
        <StatCard color="#f39c12">
          <StatTitle>Returns Statistics</StatTitle>
          <StatValue>{(logReturnsSummary.mean * 100).toFixed(3)}%</StatValue>
          <div>Mean Daily Return</div>
        </StatCard>
        <StatCard color="#27ae60">
          <StatTitle>Volatility</StatTitle>
          <StatValue>{(logReturnsSummary.std * 100).toFixed(2)}%</StatValue>
          <div>Daily Volatility</div>
        </StatCard>
      </StatsContainer>

      <ChartContainer>
        <ChartTitle>Price Trend Analysis</ChartTitle>
        <Plot
          data={priceChartData}
          layout={priceChartLayout}
          config={{ displayModeBar: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Log Returns Analysis</ChartTitle>
        <Plot
          data={returnsChartData}
          layout={returnsChartLayout}
          config={{ displayModeBar: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Volatility Analysis</ChartTitle>
        <Plot
          data={volatilityChartData}
          layout={volatilityChartLayout}
          config={{ displayModeBar: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </ChartContainer>
    </AnalysisContainer>
  );
};

export default PriceAnalysis;
