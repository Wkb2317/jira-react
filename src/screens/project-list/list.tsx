import React, { memo } from 'react'
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
          dataIndex: 'name'
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
