import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppProvider } from './hooks'
import { Routes } from './routes'

import GlobalStyles from './styles/global'

export const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyles />
  </Router>
)

export default App
