import React, { memo } from 'react'
import { Form, Input, Select } from 'antd'
import type { ISearchPanel } from './type'
import { IdSelect } from '../../components/id-select'
import { UserSelect } from '../../components/user-select'

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
        <UserSelect
          value={param?.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value || 0
            })
          }
          defaultOptionName={'负责人'}
        />
      </Form.Item>
    </Form>
  )
})
