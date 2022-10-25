import React from 'react'
import { ProjectList } from './screens/project-list/index.jsx'
import { TsTest } from './screens/ts-test/index'
import { UnAuthApp } from './unAuth/index'
import { AuthApp } from './authApp'
import { FullPageError, useAuth } from './context/auth-context'
import './App.css'
import { memo } from 'react'
import { ErrorBoundary } from './components/error-boundary'

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthApp></AuthApp> : <UnAuthApp></UnAuthApp>}
      </ErrorBoundary>
    </div>
  )
}

export default memo(App)
