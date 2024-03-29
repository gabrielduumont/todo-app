import styled from 'styled-components'

const getColor = (completed?: string) => {
  if (completed) {
    return '55, 55, 55'
  }

  return '255, 255, 255'
}

export const TaskContainer = styled.div<{ completed?: string }>`
  background: rgba(${(props) => getColor(props.completed)}, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(${(props) => getColor(props.completed)}, 0.3);
  gap: 8px;
`

export const TaskName = styled.span<{ completed?: string }>`
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  color: ${(props) => (props.completed ? '#777' : '#fff')};
  font-weight: ${(props) => (props.completed ? 'lighter' : 'bold')};
  flex-grow: 1;
  font-size: 14px;
`

export const IconContainer = styled.div<{ completed?: string }>`
  cursor: ${(props) => (props.completed ? 'not-allowed' : 'pointer')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    !props.completed
      ? `&:hover {
    color: #ddd;
  }`
      : ''}
`
