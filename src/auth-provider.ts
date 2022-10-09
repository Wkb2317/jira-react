import { User } from './screens/project-list/type'
import { BASE_URL } from './config/config'
import { http } from './utils/http'
const localStorageKey = '__auth_priverder_token__'

interface Form {
  username: string
  password: string
}

// 获取token
export const getToken = () => localStorage.getItem(localStorageKey)

// 存贮token
export const handleUserResponse = ({ user }: { user: User }): User => {
  localStorage.setItem(localStorageKey, user.token || '')
  return user
}

type LoginRes = User | null
// 登录接口
export const loginApi = (form: Form): Promise<User> => {
  return http(`login `, {
    method: 'POST',
    data: form
  }).then(async (res) => {
    return handleUserResponse(res)
  })
}

// 注册
export const registerApi = (form: Form): Promise<User> => {
  return http(`register `, {
    method: 'POST',
    data: form
  }).then(async (res) => {
    return handleUserResponse(res)
  })
}

// 登出
export const logout = () =>
  Promise.resolve(localStorage.removeItem(localStorageKey))
