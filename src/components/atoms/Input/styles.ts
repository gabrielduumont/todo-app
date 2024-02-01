import styled from 'styled-components'

export const GlassmorphicInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`
