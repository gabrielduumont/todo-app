import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const GlassmorphicSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light grey border */
  border-top: 4px solid #fff; /* White border for the top */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;