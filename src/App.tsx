import styled from 'styled-components'
import PageContainer from './components/atoms/PageContainer'
import Title from './components/atoms/Title'
import TodoList from './components/organisms/TodoList'

const AppContainer = styled.div`
  background: linear-gradient(to right, #6dd5ed, #2193b0);
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const App = () => {
  return (
    <AppContainer>
      <PageContainer>
        <Title subtitle="your todo's list in glassmorphic style" align="right">
          welcome to glass2do
        </Title>
        <TodoList />
      </PageContainer>
    </AppContainer>
  )
}

export default App
