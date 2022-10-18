import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { KanBan } from './kanban/kanban'
import TaskGroup from './task-group/task-group'

export const ProjectDetail = () => {
  return (
    <div>
      <h1>ProjectDetail</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>

      <Routes>
        <Route path="/kanban" element={<KanBan></KanBan>}></Route>
        <Route path="/epic" element={<TaskGroup></TaskGroup>}></Route>
        <Route index element={<KanBan></KanBan>}></Route>
      </Routes>
    </div>
  )
}
