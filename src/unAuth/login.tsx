import React, { FormEvent } from 'react'
import { loginApi } from '../auth-provider'
import { useAuth } from '../context/auth-context'

export function Login() {
  const { user, login } = useAuth()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单的默认事件
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <div>
      <div>{user === null ? '' : `登录成功，当前用户是${user.name}`}</div>
      <form onSubmit={(event) => submit(event)}>
        <label htmlFor="username">账户</label>
        <input type="text" name="username" />
        <label htmlFor="password">密码</label>
        <input type="password" name="password" />
        <button>登录</button>
      </form>
    </div>
  )
}
