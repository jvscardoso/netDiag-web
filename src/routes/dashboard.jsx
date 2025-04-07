import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { LoadingScreen } from '../components/loading-screen'

const DashboardPage = lazy(() => import('../pages/dashboard'))

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
    ]
  }
]

export default dashboardRoutes
