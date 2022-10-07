import React from 'react'
import { useAuth } from './context/auth-context'
import { ProjectList } from './screens/project-list'

export function AuthApp() {
  const { logout } = useAuth()

  return (
    <div>
      <button onClick={() => logout()}>登出</button>
      <ProjectList></ProjectList>
    </div>
  )
}
