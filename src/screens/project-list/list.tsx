import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import dayjs from 'dayjs'
import type { IList } from './type'

export const List = memo(({ users, ...props }: IList) => {
  return (
    <Table
      pagination={false}
      rowKey={'id'}
      columns={[
        {
          title: '项目',
          render(value, row) {
            return <Link to={`/project/${value.id}`}>{value.name}</Link>
          }
        },
        {
          title: '负责人',
          render(value, row) {
            return (
              <span>
                {users.find((user) => user.id === row.personId)?.name}
              </span>
            )
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '部门',
          dataIndex: 'created',
          render(value, row) {
            return <span>{dayjs(value).format('YYYY-MM-DD')}</span>
          }
        }
      ]}
      {...props}
    ></Table>
  )
})
