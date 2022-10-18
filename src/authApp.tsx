import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { useAuth } from './context/auth-context'
import { ProjectList } from './screens/project-list'
import styled from '@emotion/styled'
import { Row } from './components/lib'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ProjectDetail } from './screens/project-detail'
import { resetRoute } from './utils'

export function AuthApp() {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/project" element={<ProjectList />}></Route>
            {/* 这里加/* 成为主路由 */}
            <Route
              path="/project/:id/*"
              element={<ProjectDetail></ProjectDetail>}
            ></Route>
            <Route index element={<ProjectList />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
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
    <Header between={true}>
      <HeaderLeft>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo className="logo"></SoftwareLogo>
        </Button>

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
