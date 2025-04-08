import {useRoutes} from 'react-router-dom'
import LoginPage from '../pages/login/login'
import dashboardRoutes from './dashboard'
import usersRoutes from './user'
import diagnosticsRoutes from './diagnostics'
import NotFoundPage from '../pages/404/index'

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage/>
    },

    ...dashboardRoutes,

    ...usersRoutes,

    ...diagnosticsRoutes,

    {path: '*', element: <NotFoundPage/>}
  ])

  return routes
}
