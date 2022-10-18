import React, { useEffect, useRef } from 'react'

export const useDocumentTitle = (
  title: string,
  isKeepTitle: boolean = true
) => {
  // 初始值
  const oldTitle = useRef(document.title)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!isKeepTitle) {
        document.title = oldTitle.current
      }
    }
  }, [isKeepTitle])
}
