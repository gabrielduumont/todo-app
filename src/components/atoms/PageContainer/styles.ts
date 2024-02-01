import styled from 'styled-components'

export const GlassmorphicContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 16px;
  width: 80%;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);

  @media (max-width: 768px) {
    padding: 12px;
    margin: 25px auto;
  }
  @media (min-width: 1366px) {
    max-width: 1200px;
  }
`
