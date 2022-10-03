import React from 'react'

export const List = ({ list, users }) => {
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
