import { Project } from './../screens/project-list/type'
import qs from 'qs'
import { BASE_URL } from '../config/config'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'
import { message } from 'antd'

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = (
  endPoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? token : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endPoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return fetch(`${BASE_URL}/${endPoint}`, config).then(
    async (res) => {
      if (res.status === 401) {
        await auth.logout()
        return Promise.reject({ message: '请重新登录' })
      }
      if (res.status === 400) {
        console.log('status 400')
        const data = await res.json()
        message.error(data.message)
        return Promise.reject({ message: data.message })
      }
      const data = await res.json()
      if (res.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    },
    (err: Error) => {
      console.log('http function err:', err)
    }
  )
}

export function useHttp() {
  const { user } = useAuth()
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token })
}

type Person = {
  name: string
  age: number
}
// keyof 拿到Person的key
type PersonKeys = keyof Person
// Exclude 排除某个类型
type age = Exclude<PersonKeys, 'name'>
// Pick 挑选某个类型
type name = Pick<Person, 'name'>
// Omit 删除某个类型
type age2 = Omit<Person, 'name'>
// Partial 将类型都变成可选类型
const xiaoHong: Partial<Person> = {}
