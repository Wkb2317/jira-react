import React from 'react'
import { Form, Input, Select } from 'antd'
import type { ISearchPanel } from './type'

export const SearchPanel = ({ param, setParam, users }: ISearchPanel) => {
  return (
    <Form style={{ display: 'flex' }}>
      <Input
        type="text"
        value={param?.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value
          })
        }
      />
      <Select
        value={param?.personId}
        onChange={(value) =>
          setParam({
            ...param,
            personId: value
          })
        }
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((item) => (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form>
  )
}
