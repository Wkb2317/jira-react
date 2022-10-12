import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { useHttp } from '../utils/http'
import { cleanObject } from '../utils/index'
import { Project } from '../screens/project-list/type'

export function useProjects(params: any) {
  const client = useHttp()
  const { isLoading, run, data: list } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', { data: cleanObject(params) }))
  }, [params])

  return {
    list,
    isLoading
  }
}
