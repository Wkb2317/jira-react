import React, { useEffect, useRef } from 'react'

/**
 * 存储当前组件的状态
 */
export function useMountedRef() {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
