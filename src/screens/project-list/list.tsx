import React from 'react'
import type { IList } from './type'

export const List = ({ list, users }: IList) => {
  return (
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{users.find((user) => user.id === item.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
