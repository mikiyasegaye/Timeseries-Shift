import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 300;
`;

const SubText = styled.p`
  margin: 10px 0 0 0;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>Loading Dashboard</LoadingText>
      <SubText>Connecting to API and loading data...</SubText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
