import { useRoutes } from 'react-router-dom'
import LoginPage from '../pages/login/login'
import dashboardRoutes from './dashboard'
import usersRoutes from "./user"
import diagnosticsRoutes from './diagnostics'

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />
    },

    ...dashboardRoutes,

    ...usersRoutes,

    ...diagnosticsRoutes,
  ])

  return routes
}
