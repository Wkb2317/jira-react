import React, { FormEvent, memo } from 'react'
import { Form, Input, Button } from 'antd'
import { useAuth } from '../context/auth-context'

export const Register = memo(() => {
  const { user, register } = useAuth()

  const submit = (values: { username: string; password: string }) => {
    register(values)
  }

  return (
    <div>
      <Form onFinish={submit}>
        <Form.Item
          label="姓名"
          name="username"
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input type="password"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})
