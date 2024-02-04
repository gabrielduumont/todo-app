import {
  Alignment,
  Container,
  SubtitleContainer,
  TitleContainer,
} from './styles'

type TitleProps = { children: string; subtitle?: string; align?: Alignment }

const Title = ({ children, subtitle, align }: TitleProps) => (
  <Container align={align} data-testid="title-container">
    <TitleContainer>{children}</TitleContainer>
    {subtitle && (
      <SubtitleContainer data-testid="subtitle">{subtitle}</SubtitleContainer>
    )}
  </Container>
)

export default Title
