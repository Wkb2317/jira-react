import React from 'react'
import { useState } from 'react'

type Person = {
  name: string
  age: number
}

type IParam = Person[]

export function useArray<P>(param: P[]) {
  let [state, setState] = useState(param)

  const clear = (): void => {
    setState([])
  }

  const removeIndex = (index: number): void => {
    state.splice(index, 1)
    setState([...state])
  }

  const add = (person: P) => {
    setState([...state, person])
  }

  return {
    value: state,
    clear,
    removeIndex,
    add
  }
}
