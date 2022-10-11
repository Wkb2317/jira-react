import React, { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay?: number) => {
  // 用另一个state来监听传入值的变化
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // console.log('render useDebounce')
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}
