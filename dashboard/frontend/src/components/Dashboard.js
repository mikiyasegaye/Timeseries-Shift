import React from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const DashboardTitle = styled.h1`
  margin: 0 0 2rem 0;
  color: #2c3e50;
  font-size: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${(props) => props.color || "#3498db"};
`;

const StatTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatSubtext = styled.div`
  font-size: 0.8rem;
  color: #95a5a6;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const Dashboard = ({ data }) => {
  if (!data.brentPrices) {
    return <div>Loading dashboard data...</div>;
  }

  const { summary } = data.brentPrices;
  const totalEvents = data.events?.events?.length || 0;
  const changePointsCount = data.changePoints?.total_change_points || 0;

  // Create price trend chart data
  const priceChartData = [
    {
      x: data.brentPrices.dates,
      y: data.brentPrices.prices,
      type: "scatter",
      mode: "lines",
      name: "Brent Oil Price",
      line: { color: "#3498db", width: 2 },
    },
  ];

  const priceChartLayout = {
    title: `Brent Oil Price Trend (${summary.start_date} - ${summary.end_date})`,
    xaxis: { title: "Date" },
    yaxis: { title: "Price (USD)" },
    height: 400,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  // Create returns distribution chart
  const returnsChartData = [
    {
      x: data.logReturns?.log_returns || [],
      type: "histogram",
      name: "Log Returns",
      marker: { color: "#e74c3c" },
      nbinsx: 50,
    },
  ];

  const returnsChartLayout = {
    title: "Distribution of Log Returns",
    xaxis: { title: "Log Returns" },
    yaxis: { title: "Frequency" },
    height: 400,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard Overview</DashboardTitle>

      <StatsGrid>
        <StatCard color="#3498db">
          <StatTitle>Data Coverage</StatTitle>
          <StatValue>{summary.total_observations.toLocaleString()}</StatValue>
          <StatSubtext>
            Daily observations from {summary.start_date} to {summary.end_date}
          </StatSubtext>
        </StatCard>

        <StatCard color="#e74c3c">
          <StatTitle>Price Range</StatTitle>
          <StatValue>
            ${summary.min_price.toFixed(2)} - ${summary.max_price.toFixed(2)}
          </StatValue>
          <StatSubtext>Min to Max price over 35 years</StatSubtext>
        </StatCard>

        <StatCard color="#f39c12">
          <StatTitle>Average Price</StatTitle>
          <StatValue>${summary.mean_price.toFixed(2)}</StatValue>
          <StatSubtext>
            Mean price with ${summary.std_price.toFixed(2)} std dev
          </StatSubtext>
        </StatCard>

        <StatCard color="#27ae60">
          <StatTitle>Major Events</StatTitle>
          <StatValue>{totalEvents}</StatValue>
          <StatSubtext>Geopolitical and economic events analyzed</StatSubtext>
        </StatCard>

        <StatCard color="#9b59b6">
          <StatTitle>Change Points</StatTitle>
          <StatValue>{changePointsCount}</StatValue>
          <StatSubtext>
            Structural breaks identified in price series
          </StatSubtext>
        </StatCard>

        <StatCard color="#1abc9c">
          <StatTitle>Analysis Period</StatTitle>
          <StatValue>35 Years</StatValue>
          <StatSubtext>Comprehensive historical analysis</StatSubtext>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartContainer>
          <ChartTitle>Price Trend Analysis</ChartTitle>
          <Plot
            data={priceChartData}
            layout={priceChartLayout}
            config={{ displayModeBar: false }}
            style={{ width: "100%", height: "100%" }}
          />
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Returns Distribution</ChartTitle>
          <Plot
            data={returnsChartData}
            layout={returnsChartLayout}
            config={{ displayModeBar: false }}
            style={{ width: "100%", height: "100%" }}
          />
        </ChartContainer>
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
