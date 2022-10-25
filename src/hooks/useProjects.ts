import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { useHttp } from '../utils/http'
import { cleanObject } from '../utils/index'
import { Project } from '../screens/project-list/type'

export function useProjects(params?: any) {
  const client = useHttp()
  const { isLoading, run, data: list, retry } = useAsync<Project[]>()

  useEffect(() => {
    const fetchProjects = () =>
      client('projects', { data: cleanObject(params) })
    run(fetchProjects(), { retry: fetchProjects })
  }, [client, params, run])

  return {
    list,
    isLoading,
    retry
  }
}

// 编辑项目
export function useEditProject() {
  const client = useHttp()
  const { run, ...restAsyncData } = useAsync()

  const mutate = (params: Partial<Project>) => {
    const fetchProjects = () =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      })
    return run(fetchProjects())
  }

  return {
    mutate,
    ...restAsyncData
  }
}

// 添加项目
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
