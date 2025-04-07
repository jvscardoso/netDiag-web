import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import MainLayout from '../layouts/main-layout'
import {LoadingScreen} from '../components/loading-screen'
import UsersPage from '../pages/users/index'
import UserRegisterPage from '../pages/users/user-register'

const usersRoutes = [
  {
    path: '/users',
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
        element: <UsersPage/>
      },
      {
        path: 'create-or-update',
        element: <UserRegisterPage/>
      },
    ]
  }
]

export default usersRoutes
