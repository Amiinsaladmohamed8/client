import React, { lazy, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import initializeApp from './app/init'
import checkAuth from './app/auth'

// Pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))

initializeApp()

function App() {
  useEffect(() => {
    themeChange(false)
  }, [])

  const auth = checkAuth()
  console.log("check token value: ", auth?.token)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        

        {/* Protected Routes */}
        <Route
          path="/app/*"
          element={
            auth?.token ? <Layout user={auth?.user} /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-All Route */}
        <Route
          path="*"
          element={<Navigate to={auth?.token ? "/app/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  )
}

export default App
