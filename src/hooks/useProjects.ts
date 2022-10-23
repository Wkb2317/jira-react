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

export function useEditProject() {
  const client = useHttp()
  const { run, ...restAsyncData } = useAsync()

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      })
    )
  }

  return {
    mutate,
    ...restAsyncData
  }
}

export function useAddProject() {
  const client = useHttp()
  const { run, ...restAsyncData } = useAsync()

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'post',
        data: params
      })
    )
  }

  return {
    mutate,
    ...restAsyncData
  }
}
