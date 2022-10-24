import { useCallback, useState } from 'react'
import { useMountedRef } from './useMountedRef'

interface State<D> {
  data: D | null
  status: 'pending' | 'loading' | 'success' | 'error'
  error: Error | null
}

// 初始值
const defaultState: State<null> = {
  data: null,
  status: 'pending',
  error: null
}

export function useAsync<D>(initialState?: State<D>) {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState
  })

  const setSuccess = useCallback((res: any) => {
    setState({
      data: res,
      status: 'success',
      error: null
    })
  }, [])

  const setData = useCallback((data: D) => {
    setState({
      ...state,
      data
    })
  }, [])

  const setError = useCallback((res: Error) => {
    setState({
      data: null,
      status: 'error',
      error: res
    })
  }, [])

  const [retry, setRetry] = useState(() => () => {})
  // 如果当前组件挂载了
  const mounted = useMountedRef()

  const run = useCallback(
    (promise: Promise<D>, retryConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !(promise instanceof Promise)) {
        throw new Error('请传入promise对象')
      }
      setRetry(() => () => {
        if (retryConfig?.retry) {
          run(retryConfig?.retry(), { retry: retryConfig?.retry })
        }
      })
      setState({
        ...state,
        status: 'loading'
      })

      return promise
        .then((res) => {
          if (mounted.current) {
            setSuccess(res)
          }
          return res
        })
        .catch((err) => {
          setError(err)
          return err
        })
    },
    []
  )

  return {
    isPending: state.status === 'pending',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    setError,
    setSuccess,
    setState,
    setData,
    run,
    retry,
    ...state
  }
}
