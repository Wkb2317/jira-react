import React, { useState } from 'react'
import { Register } from './register'
import { Login } from './login'

export function UnAuthApp() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div>
      {isRegister ? <Register></Register> : <Login></Login>}
      <button onClick={() => setIsRegister(!isRegister)}>切换</button>
    </div>
  )
}
