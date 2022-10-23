import { useMemo } from 'react'
import { useUrlQueryParam } from '../../hooks/useUrlQueryParam'

export const projectSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const projectParam = useMemo(
    () => ({ ...param, personId: Number(param.personId) }),
    [param]
  )

  return [projectParam, setParam] as const
}
