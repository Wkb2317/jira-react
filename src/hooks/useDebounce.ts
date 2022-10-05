import React, { useEffect, useState } from 'react'

export function useDebounce(value: any, delay?: number) {
  // 用另一个state来监听传入值的变化
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}
