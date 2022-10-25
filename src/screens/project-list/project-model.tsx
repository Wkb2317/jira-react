import { Button, Drawer } from 'antd'
import React, { useState } from 'react'

interface ProjectDrawerProps {
  open: boolean
  onClose: () => void
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = (
  props: ProjectDrawerProps
) => {
  return (
    <>
      <Drawer
        width="100%"
        title="项目"
        placement="right"
        onClose={props.onClose}
        open={props.open}
      >
        <Button type="primary" onClick={props.onClose}>
          close
        </Button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
