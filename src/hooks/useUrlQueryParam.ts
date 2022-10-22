import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cleanObject } from '../utils'

// 获取url中的参数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams()

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParam.get(key) || '' }
        }, {} as { [key in K]: string }),
      [searchParam]
    ),
    (param: Partial<{ [k in K]: unknown }>) => {
      const o = cleanObject({ ...Object.fromEntries(searchParam), ...param })
      return setSearchParam(o)
    }
  ] as const
}
