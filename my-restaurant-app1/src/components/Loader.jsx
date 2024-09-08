import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Spinner = styled.div`
  border: 4px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export default Loader;
