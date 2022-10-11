import React from 'react'
import { useEffect, useState, memo } from 'react'

import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject } from '../../utils/index'
import { useMount } from '../../hooks/useMount'
import { useDebounce } from '../../hooks/useDebounce'
import { useHttp } from '../../utils/http'
import styled from '@emotion/styled'

export const ProjectList = memo(() => {
  // 搜索参数
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const client = useHttp()

  const debounceParam = useDebounce(param, 300)
  // 人员列表
  const [users, setUsers] = useState([])
  // 搜索结果
  const [list, setList] = useState([])

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setList)
  }, [debounceParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Wrapper>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  padding: 2rem;
`
