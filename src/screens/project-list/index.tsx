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
import { useUrlQueryParam } from '../../hooks/useUrlQueryParam'
import { projectSearchParam } from './util'

interface ProejctListProps {
  projectButton: JSX.Element
}

export const ProjectList: React.FC<ProejctListProps> = memo(function (
  props: ProejctListProps
) {
  useDocumentTitle('项目列表', false)

  // 搜索参数
  const [param, setParam] = projectSearchParam()

  const debounceParam = useDebounce(param, 300)
  // 人员列表
  const { users } = useUsers()
  // 搜索结果
  // const [list, setList] = useState([])
  // 获取列表数据
  const { isLoading, list, retry } = useProjects(debounceParam)

  return (
    <Wrapper>
      <div className="header">
        <h1>项目列表</h1>
        {props.projectButton}
      </div>

      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        refresh={retry}
      ></List>
    </Wrapper>
  )
})

ProjectList.whyDidYouRender = true

const Wrapper = styled.div`
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
  }
`
