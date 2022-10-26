import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from '../hooks/useProjects'

interface ProjectPopoverProps {
  projectButton: JSX.Element
}

export const ProjectPopover: React.FC<ProjectPopoverProps> = (
  props: ProjectPopoverProps
) => {
  const { list } = useProjects()

  const pinProjectList = list?.filter((item) => item.pin)

  const content = (
    <ListContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List
        dataSource={pinProjectList}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      ></List>

      <Divider></Divider>
      {props.projectButton}
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
