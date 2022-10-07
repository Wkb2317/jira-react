import React, { ReactNode, useState } from 'react'
import * as auth from '../auth-provider'
import { useMount } from '../hooks/useMount'
import { User } from '../screens/project-list/type'
import { http } from '../utils/http'

interface AuthForm {
  username: string
  password: string
}

// 初始化user
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<
  | {
      user: User | null
      login: (form: AuthForm) => Promise<void>
      register: (form: AuthForm) => Promise<void>
      logout: () => void
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// provider组件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  const login = (form: AuthForm) =>
    auth.loginApi(form).then((user) => setUser(user))

  const register = (form: AuthForm) =>
    auth.registerApi(form).then((res) => setUser(res))

  const logout = () => auth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    ></AuthContext.Provider>
  )
}

// 自定义hook
export const useAuth = () => {
  const authContext = React.useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return authContext
}
