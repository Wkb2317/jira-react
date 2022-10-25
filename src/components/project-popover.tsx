import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from '../hooks/useProjects'

interface ProjectPopoverProps {
  createProject: (value: boolean) => void
}

export const ProjectPopover: React.FC<ProjectPopoverProps> = (
  props: ProjectPopoverProps
) => {
  const { list } = useProjects()
  console.log(list)

  const pinProjectList = list?.filter((item) => item.pin)

  const content = (
    <ListContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List
        dataSource={pinProjectList}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      ></List>

      <Divider></Divider>
      <Button type="link" onClick={() => props.createProject(true)}>
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
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
