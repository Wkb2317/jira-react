import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { useAuth } from './context/auth-context'
import { ProjectList } from './screens/project-list'
import styled from '@emotion/styled'
import { Row } from './components/lib'

export function AuthApp() {
  const { logout } = useAuth()

  const menu = (
    <Menu
      items={[
        {
          key: '2',
          label: <span onClick={() => logout()}>登出</span>,
          icon: <SmileOutlined />
        }
      ]}
    />
  )

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft between={true} gap={true}>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>成员</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                设置
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectList></ProjectList>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Header = styled(Row)`
  width: 100vw;
  height: 6.25rem;
  padding: 0px 1.25rem;
`

const HeaderLeft = styled(Row)`
  width: 18.5rem;
  height: 100%;
`

const HeaderRight = styled.div``

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 6.25rem);
`
