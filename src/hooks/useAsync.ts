import { useState } from 'react'

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

  const setSuccess = (res: any) => {
    setState({
      data: res,
      status: 'success',
      error: null
    })
  }

  const setData = (data: D) => {
    setState({
      ...state,
      data
    })
  }

  const setError = (res: Error) => {
    setState({
      data: null,
      status: 'error',
      error: res
    })
  }

  const run = (promise: Promise<D>) => {
    if (!promise || !(promise instanceof Promise)) {
      throw new Error('请传入promise对象')
    }
    setState({
      ...state,
      status: 'loading'
    })
    return promise
      .then((res) => {
        setSuccess(res)
        return res
      })
      .catch((err) => {
        setError(err)
        return err
      })
  }

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
    ...state
  }
}
