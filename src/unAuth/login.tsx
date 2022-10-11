import React, { FormEvent, memo } from 'react'
import { Form, Input, Button } from 'antd'
import { useAuth } from '../context/auth-context'

export const Login = memo(() => {
  const { user, login } = useAuth()

  const submit = (values: { username: string; password: string }) => {
    login(values)
  }

  return (
    <div>
      <Form onFinish={submit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input type="password"></Input>
        </Form.Item>
        <Form.Item>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})
