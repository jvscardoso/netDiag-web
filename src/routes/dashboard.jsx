import {lazy, Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import AuthGuard from './auth-guard'

const DashboardPage = lazy(() => import('../pages/dashboard'))

const dashboardRoutes = [
  {
    path: '/dashboard',
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
        element: <DashboardPage/>
      },
    ]
  }
]

export default dashboardRoutes
