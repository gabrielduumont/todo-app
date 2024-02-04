import styled from 'styled-components'

export const GlassmorphicButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.25);
    color: #999;
    border-color:rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
  }
`
