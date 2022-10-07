import { User } from './screens/project-list/type'
import { BASE_URL } from './config/config'
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
  return fetch(`${BASE_URL}/login `, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json '
    },
    body: JSON.stringify(form)
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(form)
    }
  })
}

// 注册
export const registerApi = (form: Form): Promise<User> => {
  return fetch(`${BASE_URL}/register `, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json '
    },
    body: JSON.stringify(form)
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(res)
    }
  })
}

// 登出
export const logout = () =>
  Promise.resolve(localStorage.removeItem(localStorageKey))
