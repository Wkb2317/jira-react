import React from 'react'
import { useEffect, useState, memo } from 'react'

import { SearchPanel } from './search-panel'
import { List } from './list'

import { useMount } from '../../hooks/useMount'
import { useDebounce } from '../../hooks/useDebounce'
import { useHttp } from '../../utils/http'
import styled from '@emotion/styled'
import { useAsync } from '../../hooks/useAsync'
import { Project } from './type'
import { useProjects } from '../../hooks/useProjects'
import { useUsers } from '../../hooks/useUsers'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export const ProjectList = memo(() => {
  // 搜索参数
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  useDocumentTitle('项目列表', false)

  const client = useHttp()

  const debounceParam = useDebounce(param, 300)
  // 人员列表
  const { users } = useUsers()
  // 搜索结果
  // const [list, setList] = useState([])
  const { isLoading, list } = useProjects(debounceParam)

  return (
    <Wrapper>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  padding: 2rem;
`
