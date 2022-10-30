import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from '../hooks/useProjects'
import { useAppDispatch } from '../store'
import { openProjectModel } from '../screens/project-list/project-slice'

export const ProjectPopover: React.FC<any> = () => {
  const { list } = useProjects()
  const dispatch = useAppDispatch()

  const pinProjectList = list?.filter((item) => item.pin)

  const content = (
    <ListContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List
        dataSource={pinProjectList}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      ></List>

      <Divider></Divider>
      <Button
        style={{ fontSize: '18px' }}
        type="link"
        onClick={() => dispatch(openProjectModel())}
      >
        创建项目
      </Button>
    </ListContainer>
  )

  return (
    <Popover content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ListContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
