import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { setUser } from './store/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && !isAuthenticated) {
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]))
        dispatch(setUser({
          id: tokenPayload.sub ? parseInt(tokenPayload.sub) : 0,
          email: tokenPayload.email || tokenPayload.sub || '',
          firstName: 'User',
          lastName: '',
          roles: tokenPayload.authorities?.split(',') || [],
        }))
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    }
  }, [dispatch, isAuthenticated])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
