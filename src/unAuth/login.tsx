import React, { FormEvent, memo, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useAuth } from '../context/auth-context'
import { useAsync } from '../hooks/useAsync'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const Login = memo(() => {
  const { user, login } = useAuth()
  const { isLoading, run } = useAsync()

  useDocumentTitle('登录或注册', false)

  const submit = (values: { username: string; password: string }) => {
    run(login(values))
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
          <Button
            loading={isLoading}
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})
