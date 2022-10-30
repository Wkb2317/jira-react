import './wdyr.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { loadServer, DevTools } from 'jira-dev-tool'

import App from './App'
import AppProvider from './context/index'

//  redux
import { Provider } from 'react-redux'
import { store } from './store'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

loadServer(() =>
  root.render(
    <Provider store={store}>
      <AppProvider>
        <DevTools />
        <App />
      </AppProvider>
    </Provider>
  )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
