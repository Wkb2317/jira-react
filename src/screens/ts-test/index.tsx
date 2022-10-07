import React from 'react'
import { useArray } from '../../hooks/useArray'

export function TsTest() {
  const persons: { name: string; age: number }[] = [
    {
      name: 'lihong',
      age: 12
    },
    {
      name: 'wkb',
      age: 18
    }
  ]

  const { value, clear, removeIndex, add } = useArray(persons)

  return (
    <div>
      {/* 添加 */}
      <button onClick={() => add({ name: 'john', age: 11 })}>add</button>
      {/* 删除第一个 */}
      <button onClick={() => removeIndex(0)}>remove 0</button>
      {/* 清空列表 */}
      <button onClick={() => clear()}>clear</button>
      <ul>
        {value.map((person, index) => {
          return (
            <li key={index}>
              <span>{index}</span>
              <span>{person.name}</span>
              <span>{person.age}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
