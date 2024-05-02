import { Route, Routes } from 'react-router-dom'
import OnlyGuestRoute from './components/OnlyGuestRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Application from './pages/Application'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Routes>
        <Route path='register'
          element={
            <OnlyGuestRoute redirect='/app'>
              <Register />
            </OnlyGuestRoute>
          }
        />
        <Route path='login'
          element={
            <OnlyGuestRoute redirect='/app'>
              <Login />
            </OnlyGuestRoute>
          }
        />
        <Route path='app/*'
          element={
            <ProtectedRoute redirect='/login'>
              <Application />
            </ProtectedRoute>
          }
        />
        <Route path='*' Component={NotFound} />
      </Routes>
    </>
  )
}

export default App
