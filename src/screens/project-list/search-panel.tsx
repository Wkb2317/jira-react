import React from 'react'
import type { ISearchPanel } from './type'

export const SearchPanel = ({ param, setParam, users }: ISearchPanel) => {
  return (
    <form>
      <input
        type="text"
        value={param?.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value
          })
        }
      />
      <select
        value={param?.personId}
        onChange={(e) =>
          setParam({
            ...param,
            personId: e.target.value
          })
        }
      >
        <option value="">负责人</option>
        {users.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </form>
  )
}
