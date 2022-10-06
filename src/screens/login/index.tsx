import React, { FormEvent } from 'react'
import { BASE_URL } from '../../config/config'

export function Login() {
  const login = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单的默认事件
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    fetch(`${BASE_URL}/login `, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json '
      },
      body: JSON.stringify({ username, password })
    }).then(async (res) => {
      console.log(await res.json())
    })
  }

  return (
    <div>
      <form onSubmit={(event) => login(event)}>
        <label htmlFor="username">账户</label>
        <input type="text" name="username" />
        <label htmlFor="password">密码</label>
        <input type="password" name="password" />
        <button>登录</button>
      </form>
    </div>
  )
}
