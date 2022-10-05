import React from 'react'
import { useEffect, useState } from 'react'
import qs from 'qs'

import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject } from '../../utils/index'
import { useMount } from '../../hooks/useMount'
import { useDebounce } from '../../hooks/useDebounce'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const ProjectList = () => {
  // 搜索参数
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 300)
  // 人员列表
  const [users, setUsers] = useState([])
  // 搜索结果
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/projects?${qs.stringify(cleanObject(debounceParam))}`, {
      method: 'get'
    }).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${BASE_URL}/users`, {
      method: 'get'
    }).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  })

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
