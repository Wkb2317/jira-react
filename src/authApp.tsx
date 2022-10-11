import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { useAuth } from './context/auth-context'
import { ProjectList } from './screens/project-list'
import styled from '@emotion/styled'
import { Row } from './components/lib'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'

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
        <HeaderLeft>
          <SoftwareLogo className="logo"></SoftwareLogo>
          <div>项目</div>
          <div>成员</div>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type="link" onClick={(e) => e.preventDefault()}>
              <Space>
                Hi,david
                <DownOutlined />
              </Space>
            </Button>
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
  padding: 0px 2rem;
`

const HeaderLeft = styled.div`
  width: 36rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 25rem;
  }
`

const HeaderRight = styled.div``

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 6.25rem);
`
