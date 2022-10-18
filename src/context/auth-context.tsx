import { Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
import React, {
  ReactNode,
  useState,
  memo,
  useCallback,
  ReactPropTypes
} from 'react'
import * as auth from '../auth-provider'
import { FullPageLoading, FullPageWrapper } from '../components/lib'
import { useAsync } from '../hooks/useAsync'
import { useMount } from '../hooks/useMount'
import { User } from '../screens/project-list/type'
import { http } from '../utils/http'

interface AuthForm {
  username: string
  password: string
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
export default memo(function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  // const [user, setUser] = useState<User | null>(null)
  const {
    isLoading,
    isPending,
    isError,
    run,
    data: user,
    error,
    setData: setUser
  } = useAsync<User | null>()

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

  useMount(() => {
    run(bootstrapUser())
    // bootstrapUser().then((user) => setUser(user))
  })

  const login = (form: AuthForm) =>
    auth.loginApi(form).then((user) => setUser(user))

  const register = (form: AuthForm) =>
    auth.registerApi(form).then((res) => setUser(res))

  const logout = () => auth.logout().then(() => setUser(null))

  // 如果是在等待中，则全屏显示等待
  if (isPending || isLoading) {
    return <FullPageLoading></FullPageLoading>
  }

  // 如果报错了，显示报错页面
  if (isError) {
    return <FullPageError error={error}></FullPageError>
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    ></AuthContext.Provider>
  )
})

// 自定义hook
export const useAuth = () => {
  const authContext = React.useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return authContext
}

// 错误信息全屏展示
export const FullPageError = (props: { error: Error | null }) => {
  return (
    <FullPageWrapper>
      <DevTools></DevTools>
      <Typography.Text type="danger">{props.error?.message}</Typography.Text>
    </FullPageWrapper>
  )
}
