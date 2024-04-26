import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/style/main.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext'

ReactDOM.createRoot(document.querySelector('.wrapper')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
