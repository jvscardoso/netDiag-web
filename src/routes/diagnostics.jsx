import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import DiagnosticsPage from '../pages/diagnostics/index'

const diagnosticsRoutes = [
  {
    path: '/diagnostics',
    element: (
      <MainLayout>
        <Suspense fallback={<LoadingScreen/>}>
          <Outlet/>
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <DiagnosticsPage/>
      },
    ]
  }
]

export default diagnosticsRoutes
