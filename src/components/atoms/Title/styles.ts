import styled from 'styled-components'

export const TitleContainer = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: lighter;
  margin: 0;
`

export const SubtitleContainer = styled.h2`
  color: #fafafa;
  font-size: 1.15rem;
  font-weight: 200;
  margin: 0;
`

export type Alignment = 'right' | 'left' | 'center'

export const Container = styled.div<{ align?: Alignment }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  text-align: ${(props) => props.align ?? 'left'};
`
