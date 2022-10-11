import { ProjectList } from './screens/project-list/index.jsx'
import { TsTest } from './screens/ts-test/index'
import { UnAuthApp } from './unAuth/index'
import { AuthApp } from './authApp'
import { useAuth } from './context/auth-context'
import './App.css'
import { memo } from 'react'

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      {/* <ProjectList></ProjectList> */}
      {/* <TsTest></TsTest> */}
      {user ? <AuthApp></AuthApp> : <UnAuthApp></UnAuthApp>}
    </div>
  )
}

export default memo(App)
