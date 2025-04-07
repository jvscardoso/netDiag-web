import { useRoutes } from 'react-router-dom'
import LoginPage from '../pages/login/login'
import dashboardRoutes from './dashboard'

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />
    },

    ...dashboardRoutes,
  ])

  return routes
}
