import { ReactNode } from 'react'
import { GlassmorphicContainer } from './styles'

const PageContainer = ({ children }: { children: ReactNode }) => (
  <GlassmorphicContainer>
    <>{children}</>
  </GlassmorphicContainer>
)

export default PageContainer
