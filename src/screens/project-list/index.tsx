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
import { useProjectSearchParam } from './util'
import { Button } from 'antd'
import { useAppDispatch } from '../../store'
import { openProjectModel } from './project-slice'

export const ProjectList: React.FC<any> = memo(function () {
  useDocumentTitle('项目列表', false)

  const dispatch = useAppDispatch()

  // 搜索参数
  const [param, setParam] = useProjectSearchParam()

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
        <Button
          style={{ fontSize: '18px' }}
          type="link"
          onClick={() => dispatch(openProjectModel())}
        >
          创建项目
        </Button>
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
