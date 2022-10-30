import { Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
import React, {
  ReactNode,
  useState,
  memo,
  useCallback,
  ReactPropTypes
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as auth from '../auth-provider'
import { FullPageLoading, FullPageWrapper } from '../components/lib'
import { useAsync } from '../hooks/useAsync'
import { useMount } from '../hooks/useMount'
import { User } from '../screens/project-list/type'
import { useAppDispatch, useAppSelector } from '../store'
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  bootstrapUserThunk
} from '../store/auth'
import { http } from '../utils/http'

export interface AuthForm {
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

  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch()

  useMount(() => {
    run(dispatch(bootstrapUserThunk()))
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

  return <div>{children}</div>
})

// 自定义hook
export const useAuth = () => {
  // const authContext = React.useContext(AuthContext)
  // if (!authContext) {
  //   throw new Error('useAuth必须在AuthProvider中使用')
  // }

  // --------------  使用redux改写context  -------------
  // 获取用户信息
  const user = useAppSelector((state) => state.userReducer.user)

  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch()

  const login = (form: AuthForm) => dispatch(loginThunk(form))
  const register = (form: AuthForm) => dispatch(registerThunk(form))
  const logout = () => dispatch(logoutThunk())

  return {
    login,
    register,
    logout,
    user
  }
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

export { bootstrapUser }
