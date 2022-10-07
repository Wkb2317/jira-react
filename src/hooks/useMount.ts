import React, { useEffect } from 'react'

export function useMount(fn: () => void) {
  useEffect(() => {
    fn()
  }, [])
}
