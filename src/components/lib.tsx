import React from 'react'
import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'

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

export const FullPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 全局加载页面
export const FullPageLoading = () => {
  return (
    <FullPageWrapper>
      <Spin size="large" />
    </FullPageWrapper>
  )
}
