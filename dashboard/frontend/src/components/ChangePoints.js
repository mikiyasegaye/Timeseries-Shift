import React from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";

const ChangePointsContainer = styled.div`
  padding: 2rem;
`;

const ChangePointsTitle = styled.h1`
  margin: 0 0 2rem 0;
  color: #2c3e50;
  font-size: 2rem;
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

const ChangePointsTable = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const TableTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const Th = styled.th`
  background: #f8f9fa;
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #dee2e6;
  color: #495057;
`;

const VolatilityBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${(props) => {
    const vol = parseFloat(props.volatility);
    if (vol > 0.5) return "#e74c3c";
    if (vol > 0.3) return "#f39c12";
    return "#27ae60";
  }};
  color: white;
`;

const ChangePoints = ({ data }) => {
  if (!data.changePoints || !data.brentPrices) {
    return <div>Loading change points data...</div>;
  }

  const changePoints = data.changePoints.change_points;
  const totalChangePoints = data.changePoints.total_change_points;

  // Create change points visualization
  const changePointsData = [
    {
      x: data.brentPrices.dates,
      y: data.brentPrices.prices,
      type: "scatter",
      mode: "lines",
      name: "Brent Oil Price",
      line: { color: "#3498db", width: 1 },
    },
  ];

  const changePointsLayout = {
    title: "Brent Oil Prices with Change Points",
    xaxis: { title: "Date" },
    yaxis: { title: "Price (USD)" },
    height: 600,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  // Add change point markers
  const annotations = changePoints.map((cp, index) => ({
    x: cp.date,
    y: cp.price,
    xref: "x",
    yref: "y",
    text: `CP ${index + 1}`,
    showarrow: true,
    arrowhead: 2,
    arrowsize: 1,
    arrowwidth: 2,
    arrowcolor: "#e74c3c",
    ax: 0,
    ay: -40,
    bgcolor: "rgba(255, 255, 255, 0.8)",
    bordercolor: "#e74c3c",
    borderwidth: 1,
    font: { size: 10 },
  }));

  changePointsLayout.annotations = annotations;

  // Create volatility distribution chart
  const volatilityData = changePoints.map((cp) => cp.volatility);
  const volatilityChartData = [
    {
      x: volatilityData,
      type: "histogram",
      name: "Change Point Volatility",
      marker: { color: "#e74c3c" },
      nbinsx: 10,
    },
  ];

  const volatilityChartLayout = {
    title: "Distribution of Change Point Volatility",
    xaxis: { title: "Volatility" },
    yaxis: { title: "Frequency" },
    height: 400,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  return (
    <ChangePointsContainer>
      <ChangePointsTitle>Change Points Analysis</ChangePointsTitle>

      <StatsContainer>
        <StatCard color="#3498db">
          <StatTitle>Total Change Points</StatTitle>
          <StatValue>{totalChangePoints}</StatValue>
          <div>Structural breaks identified</div>
        </StatCard>
        <StatCard color="#e74c3c">
          <StatTitle>Average Volatility</StatTitle>
          <StatValue>
            {(
              changePoints.reduce((sum, cp) => sum + cp.volatility, 0) /
              changePoints.length
            ).toFixed(3)}
          </StatValue>
          <div>At change points</div>
        </StatCard>
        <StatCard color="#f39c12">
          <StatTitle>Analysis Period</StatTitle>
          <StatValue>
            {data.brentPrices
              ? `${new Date(
                  data.brentPrices.summary.start_date
                ).getFullYear()} - ${new Date(
                  data.brentPrices.summary.end_date
                ).getFullYear()}`
              : "Loading..."}
          </StatValue>
          <div>Comprehensive time series</div>
        </StatCard>
        <StatCard color="#27ae60">
          <StatTitle>Detection Method</StatTitle>
          <StatValue>
            {data.changePoints?.window_size
              ? `Volatility (${data.changePoints.window_size}d window)`
              : "Volatility Analysis"}
          </StatValue>
          <div>Dynamic threshold detection</div>
        </StatCard>
      </StatsContainer>

      <ChartContainer>
        <ChartTitle>Price Series with Change Points</ChartTitle>
        <Plot
          data={changePointsData}
          layout={changePointsLayout}
          config={{ displayModeBar: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Change Point Volatility Distribution</ChartTitle>
        <Plot
          data={volatilityChartData}
          layout={volatilityChartLayout}
          config={{ displayModeBar: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </ChartContainer>

      <ChangePointsTable>
        <TableTitle>Change Points Details (Top 10)</TableTitle>
        <Table>
          <thead>
            <tr>
              <Th>Rank</Th>
              <Th>Date</Th>
              <Th>Price (USD)</Th>
              <Th>Volatility</Th>
              <Th>Significance</Th>
            </tr>
          </thead>
          <tbody>
            {changePoints.map((cp, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{cp.date}</Td>
                <Td>${cp.price.toFixed(2)}</Td>
                <Td>
                  <VolatilityBadge volatility={cp.volatility}>
                    {cp.volatility.toFixed(3)}
                  </VolatilityBadge>
                </Td>
                <Td>
                  {data.changePoints?.threshold
                    ? cp.volatility > data.changePoints.threshold * 1.2
                      ? "High"
                      : cp.volatility > data.changePoints.threshold
                      ? "Medium"
                      : "Low"
                    : "Calculating..."}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ChangePointsTable>
    </ChangePointsContainer>
  );
};

export default ChangePoints;
