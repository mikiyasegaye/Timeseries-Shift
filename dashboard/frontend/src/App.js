import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import PriceAnalysis from "./components/PriceAnalysis";
import EventsTimeline from "./components/EventsTimeline";
import ChangePoints from "./components/ChangePoints";
import LoadingSpinner from "./components/LoadingSpinner";

// Global styles
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const ContentArea = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 40px);
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState("checking");
  const [data, setData] = useState({
    brentPrices: null,
    events: null,
    logReturns: null,
    changePoints: null,
  });

  // Check API health and load initial data
  useEffect(() => {
    const checkApiAndLoadData = async () => {
      try {
        // Check API health
        const healthResponse = await axios.get("/api/health");
        setApiStatus("healthy");

        // Load all data in parallel
        const [
          brentResponse,
          eventsResponse,
          logReturnsResponse,
          changePointsResponse,
        ] = await Promise.all([
          axios.get("/api/data/brent-prices"),
          axios.get("/api/data/events"),
          axios.get("/api/analysis/log-returns"),
          axios.get("/api/analysis/change-points"),
        ]);

        setData({
          brentPrices: brentResponse.data,
          events: eventsResponse.data,
          logReturns: logReturnsResponse.data,
          changePoints: changePointsResponse.data,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setApiStatus("error");
        setLoading(false);
      }
    };

    checkApiAndLoadData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (apiStatus === "error") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2>🚨 API Connection Error</h2>
        <p>
          Unable to connect to the backend API. Please ensure the Flask server
          is running on port 5000.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <MainContent>
            <ContentArea>
              <Routes>
                <Route path="/" element={<Dashboard data={data} />} />
                <Route
                  path="/price-analysis"
                  element={<PriceAnalysis data={data} />}
                />
                <Route
                  path="/events-timeline"
                  element={<EventsTimeline data={data} />}
                />
                <Route
                  path="/change-points"
                  element={<ChangePoints data={data} />}
                />
              </Routes>
            </ContentArea>
          </MainContent>
        </div>
      </AppContainer>
    </Router>
  );
}

export default App;
