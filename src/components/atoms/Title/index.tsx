import {
  Alignment,
  Container,
  SubtitleContainer,
  TitleContainer,
} from './styles'

type TitleProps = { children: string; subtitle?: string; align?: Alignment }

const Title = ({ children, subtitle, align }: TitleProps) => (
  <Container align={align}>
    <TitleContainer>{children}</TitleContainer>
    {subtitle && <SubtitleContainer>{subtitle}</SubtitleContainer>}
  </Container>
)

export default Title
