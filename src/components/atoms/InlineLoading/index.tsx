import { GlassmorphicSpinner } from './styles'

const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <GlassmorphicSpinner />
    </div>
  )
}

export default LoadingSpinner
