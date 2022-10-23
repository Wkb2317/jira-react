import React from 'react'
import { useUsers } from '../hooks/useUsers'
import { IdSelect } from './id-select'

export function UserSelect(props: React.ComponentProps<typeof IdSelect>) {
  const { users } = useUsers()

  return <IdSelect options={users || []} {...props}></IdSelect>
}
