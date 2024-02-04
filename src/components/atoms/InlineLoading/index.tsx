import { GlassmorphicSpinner } from './styles'

const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null
  }

  return (
    <div style={{ display: 'inline-block' }} data-testid="spinner">
      <GlassmorphicSpinner />
    </div>
  )
}

export default LoadingSpinner
