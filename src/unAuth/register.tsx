import React, { FormEvent, memo, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useAuth } from '../context/auth-context'
import { useAsync } from '../hooks/useAsync'

export const Register = memo(() => {
  const { user, register } = useAuth()

  const { run, isLoading } = useAsync()

  const submit = (values: {
    username: string
    password: string
    confirmPassword: string
  }) => {
    run(register(values))
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
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true, message: '请再次输入密码!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入密码不一致!'))
              }
            })
          ]}
        >
          <Input type="confirmPassword"></Input>
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})
