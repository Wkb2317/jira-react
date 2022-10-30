import { Button, Drawer } from 'antd'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../store'

import { openProjectModel, closeProjectModel } from './project-slice'

interface ProjectDrawerProps {
  open: boolean
  onClose: () => void
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = (
  props: ProjectDrawerProps
) => {
  // 获取模态框状态
  const projectModelStatus = useAppSelector(
    (state) => state.projectSlice.projectModelStatus
  )
  const dispatch = useAppDispatch()

  const onBtnClick = () => {
    if (projectModelStatus) {
      dispatch(closeProjectModel())
      return
    }
    dispatch(openProjectModel())
  }

  return (
    <>
      <Drawer
        width="100%"
        title="项目"
        placement="right"
        open={projectModelStatus}
        onClose={() => dispatch(closeProjectModel())}
      >
        <Button type="primary" onClick={onBtnClick}>
          close
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
