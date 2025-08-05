import React, { useState } from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";

const TimelineContainer = styled.div`
  padding: 2rem;
`;

const TimelineTitle = styled.h1`
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

const FilterSelect = styled.select`
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

const EventsTable = styled.div`
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

const EventCategory = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.category) {
      case "Geopolitical Conflict":
        return "#e74c3c";
      case "Economic Sanctions":
        return "#f39c12";
      case "OPEC Policy":
        return "#27ae60";
      case "Economic Crisis":
        return "#9b59b6";
      default:
        return "#95a5a6";
    }
  }};
  color: white;
`;

const ImpactBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${(props) =>
    props.impact === "Positive" ? "#27ae60" : "#e74c3c"};
  color: white;
`;

const EventsTimeline = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImpact, setSelectedImpact] = useState("All");

  if (!data.events || !data.brentPrices) {
    return <div>Loading events timeline data...</div>;
  }

  const events = data.events.events;
  const categories = ["All", ...new Set(events.map((event) => event.category))];
  const impacts = [
    "All",
    ...new Set(events.map((event) => event.expected_impact)),
  ];

  // Filter events based on selection
  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      selectedCategory === "All" || event.category === selectedCategory;
    const impactMatch =
      selectedImpact === "All" || event.expected_impact === selectedImpact;
    return categoryMatch && impactMatch;
  });

  // Create timeline chart with events
  const timelineData = [
    {
      x: data.brentPrices.dates,
      y: data.brentPrices.prices,
      type: "scatter",
      mode: "lines",
      name: "Brent Oil Price",
      line: { color: "#3498db", width: 1 },
    },
  ];

  const timelineLayout = {
    title: "Brent Oil Prices with Major Events",
    xaxis: { title: "Date" },
    yaxis: { title: "Price (USD)" },
    height: 600,
    margin: { l: 50, r: 50, t: 50, b: 50 },
  };

  return (
    <TimelineContainer>
      <TimelineTitle>Events Timeline</TimelineTitle>

      <FilterContainer>
        <FilterTitle>Filter Events</FilterTitle>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Event Category</FilterLabel>
            <FilterSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Expected Impact</FilterLabel>
            <FilterSelect
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
            >
              {impacts.map((impact) => (
                <option key={impact} value={impact}>
                  {impact}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>
      </FilterContainer>

      <ChartContainer>
        <ChartTitle>Price Timeline with Events</ChartTitle>
        <Plot
          data={timelineData}
          layout={timelineLayout}
          config={{ displayModeBar: true }}
          style={{ width: "100%", height: "100%" }}
        />
      </ChartContainer>

      <EventsTable>
        <TableTitle>Events Details ({filteredEvents.length} events)</TableTitle>
        <Table>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Event</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Expected Impact</Th>
              <Th>Observed Impact</Th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={index}>
                <Td>{event.date}</Td>
                <Td>{event.event}</Td>
                <Td>
                  <EventCategory category={event.category}>
                    {event.category}
                  </EventCategory>
                </Td>
                <Td>{event.description}</Td>
                <Td>
                  <ImpactBadge impact={event.expected_impact}>
                    {event.expected_impact}
                  </ImpactBadge>
                </Td>
                <Td>{event.observed_impact}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EventsTable>
    </TimelineContainer>
  );
};

export default EventsTimeline;
