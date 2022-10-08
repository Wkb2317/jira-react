import React, { useState } from 'react'
import { Card, Button, Divider } from 'antd'
import styled from '@emotion/styled'

import { Register } from './register'
import { Login } from './login'

export function UnAuthApp() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <Wrapper>
      <ShadowCard>
        {isRegister ? <Register></Register> : <Login></Login>}

        <Divider></Divider>
        {!isRegister ? (
          <a onClick={() => setIsRegister(!isRegister)}>没有账号？注册新账号</a>
        ) : (
          ''
        )}
      </ShadowCard>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  margin-top: 20rem;
  padding: 4rem;
  border-radius: 0.625rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
