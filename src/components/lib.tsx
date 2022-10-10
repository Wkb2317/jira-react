import styled from '@emotion/styled'

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : '')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + 'rem' : 0};

  & * {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : '0'};
  }
`
