import React, { useState } from 'react'
import { Card, Button, Divider } from 'antd'
import styled from '@emotion/styled'

import { Register } from './register'
import { Login } from './login'

import logo from '../assets/logo.svg'
import left from '../assets/left.svg'
import right from '../assets/right.svg'

export function UnAuthApp() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <Wrapper>
      <Background></Background>
      <Header></Header>
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
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
  position: relative;
  height: 100vh;
  width: 100vw;
  /* display: flex; */
  /* justify-content: center; */
`

const Header = styled.div`
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
  width: 100%;
  padding: 5rem 0;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const ShadowCard = styled(Card)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40rem;
  min-height: 56rem;
  padding: 4rem;
  border-radius: 0.625rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const Title = styled.div`
  font-size: 1.95rem;
  font-weight: 800;
  padding: 1.25rem;
`
