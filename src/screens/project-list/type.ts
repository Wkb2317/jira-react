import { TableProps } from 'antd'

export interface User {
  name: string
  id: number
  token: string
}

export interface ISearchPanel {
  param: Pick<Project, 'name' | 'personId'>
  users: User[]
  setParam: (param: ISearchPanel['param']) => void
}

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
}

export interface IList extends TableProps<Project> {
  users: User[]
}
