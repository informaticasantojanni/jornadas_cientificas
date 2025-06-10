import React from 'react'
import GlobalProvider from '../../providers/GlobalProvider'
import AuthProvider from '../auth/provider/AuthProvider'

const RootProvider = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        {children}
      </GlobalProvider>
    </AuthProvider>

  )
}

export default RootProvider
