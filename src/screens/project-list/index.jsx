import React from 'react'
import { useEffect, useState } from 'react'

import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject } from '../../utils/index'
import qs from 'qs'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const ProjectList = () => {
  // 搜索参数
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  // 人员列表
  const [users, setUsers] = useState([])
  // 搜索结果
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/projects?${qs.stringify(cleanObject(param))}`, {
      method: 'get'
    }).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${BASE_URL}/users`, {
      method: 'get'
    }).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  )
}
