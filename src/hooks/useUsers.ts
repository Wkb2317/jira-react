import { Project, User } from '../screens/project-list/type'
import { useHttp } from '../utils/http'
import { useAsync } from './useAsync'
import { useMount } from './useMount'

export function useUsers() {
  const client = useHttp()
  const { isLoading, run, data: users } = useAsync<User[]>()
  useMount(() => {
    run(client('users'))
  })

  return {
    users
  }
}
