import React, { ReactElement, ReactNode } from 'react'

type FallbackRender = (props: { error: Error | null }) => ReactElement

// * 错误边界一般用于处理渲染报错
// * 事件处理， 异步代码等都无法捕获（可以用普通的try catch捕获）

// fallbackRender 这里是接收之前定义的全屏错误组件
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }

  // 当子组件报错抛出异常时会调用
  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      // 错误时，全屏展示错误信息
      return fallbackRender({ error })
    }
    return children
  }
}
