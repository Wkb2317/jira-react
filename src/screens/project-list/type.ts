export interface User {
  name: string
  id: string
}

export interface ISearchPanel {
  param: {
    name: string
    personId: string
  }
  users: User[]
  setParam: (param: ISearchPanel['param']) => void
}

export interface Project {
  id: number
  name: string
  personId: string
}

export interface IList {
  list: Project[]
  users: User[]
}
