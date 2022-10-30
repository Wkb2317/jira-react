import React, { useState } from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { useAuth } from './context/auth-context'
import { ProjectList } from './screens/project-list'
import { Row } from './components/lib'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { ProjectDetail } from './screens/project-detail'
import { resetRoute } from './utils'
import { ProjectDrawer } from './screens/project-list/project-model'
import { ProjectPopover } from './components/project-popover'
import { useAppDispatch, useAppSelector } from './store'
import {
  openProjectModel,
  closeProjectModel
} from './screens/project-list/project-slice'

export function AuthApp() {
  const dispatch = useAppDispatch()
  const projectDrawerOpen = useAppSelector(
    (state) => state.projectSlice.projectModelStatus
  )

  const CreateProjectButton = () => {
    return (
      <Button
        style={{ fontSize: '18px' }}
        type="link"
        onClick={() => dispatch(openProjectModel())}
      >
        创建项目
      </Button>
    )
  }

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

      <ProjectDrawer
        open={projectDrawerOpen}
        onClose={() => dispatch(closeProjectModel())}
      ></ProjectDrawer>
    </Container>
  )
}

const PageHeader = () => {
  const { logout } = useAuth()
  const dispatch = useAppDispatch()

  const btnClick = () => {
    logout()
  }

  const menu = (
    <Menu
      items={[
        {
          key: '2',
          label: <span onClick={btnClick}>登出</span>,
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
        <ProjectPopover></ProjectPopover>

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
