import React from 'react'
import { Table } from 'antd'
import type { IList } from './type'

export const List = ({ list, users }: IList) => {
  return (
    <Table
      pagination={false}
      dataSource={list}
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
        }
      ]}
    ></Table>
  )
}
