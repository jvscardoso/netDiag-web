import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import DiagnosticsPage from '../pages/diagnostics/index'
import AuthGuard from './auth-guard'
import ProtectedRoute from './protected-routes'

const diagnosticsRoutes = [
  {
    path: '/diagnostics',
    element: (
      <AuthGuard>
        <MainLayout>
          <Suspense fallback={<LoadingScreen/>}>
            <Outlet/>
          </Suspense>
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <DiagnosticsPage/>
          </ProtectedRoute>
        )
      },
    ]
  }
]

export default diagnosticsRoutes
