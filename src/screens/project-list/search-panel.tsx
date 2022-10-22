import React, { memo } from 'react'
import { Form, Input, Select } from 'antd'
import type { ISearchPanel } from './type'

export const SearchPanel = memo(({ param, setParam, users }: ISearchPanel) => {
  return (
    <Form style={{ display: 'flex' }}>
      <Form.Item style={{ marginRight: '2rem' }}>
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
      </Form.Item>
      <Form.Item>
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
            <Select.Option value={String(item.id)} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})
