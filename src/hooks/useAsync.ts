import { useCallback, useReducer, useState } from 'react'
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

// 可以不用type
const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'success':
      return { ...state, ...action.payload }
    case 'error':
      return { ...state, ...action.payload }
    case 'setdata':
      return { ...state, ...action.payload }
    case 'loading':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function useAsync<D>(initialState?: State<D>) {
  // const [state, setState] = useState<State<D>>({
  //   ...defaultState,
  //   ...initialState
  // })

  const [state, dispatch] = useReducer<
    (state: State<D>, action: { type: string; payload: any }) => State<D>,
    State<D>
  >(
    reducer,
    {
      ...defaultState,
      ...initialState
    },
    (state) => state
  )

  const setSuccess = useCallback((res: any) => {
    dispatch({
      type: 'success',
      payload: {
        data: res,
        status: 'success',
        error: null
      }
    })
  }, [])

  const setData = useCallback((data: D) => {
    console.log('data', data)

    dispatch({ type: 'setdata', payload: { data } })
  }, [])

  const setError = useCallback((res: Error) => {
    dispatch({
      type: 'error',
      payload: { data: null, status: 'error', error: res }
    })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

      dispatch({
        type: 'loading',
        payload: {
          status: 'loading'
        }
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
    [mounted, setError, setSuccess]
  )

  return {
    isPending: state.status === 'pending',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    setError,
    setSuccess,
    dispatch,
    setData,
    run,
    retry,
    ...state
  }
}
