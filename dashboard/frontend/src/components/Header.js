import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4caf50;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <Title>Brent Oil Analysis Dashboard</Title>
          <Subtitle>
            Interactive visualization of historical oil prices and geopolitical
            events
          </Subtitle>
        </div>
        <StatusIndicator>
          <StatusDot />
          <span>API Connected</span>
        </StatusIndicator>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
