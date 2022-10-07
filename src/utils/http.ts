import { Project } from './../screens/project-list/type'
import qs from 'qs'
import { BASE_URL } from '../config/config'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'

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

  return fetch(`${BASE_URL}/${endPoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export function useHttp() {
  const { user } = useAuth()
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token })
}
