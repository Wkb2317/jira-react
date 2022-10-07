import React, { ReactNode, ReactPropTypes } from 'react'
import { AuthProvider } from './auth-context'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}
