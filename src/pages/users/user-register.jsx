import React from 'react'
import {Container, IconButton} from '@mui/material'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import UserForm from '../../components/user-form'
import Iconify from '../../components/iconify/index'
import {useNavigate} from 'react-router-dom'

const UserRegisterPage = () => {
  const handleGoBack = () => {
    window.history.back()
  }

  const navigate = useNavigate()

  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading="Novo usuário"
        iconButton={
          <IconButton onClick={handleGoBack}>
            <Iconify icon="eva:arrow-ios-back-fill" width={24}/>
          </IconButton>
        }
        links={[{name: 'Home', href: '/dashboard'}, {name: 'Usuários', href: 'users'}, {name: 'Novo usuário '}]}
        sx={{
          my: {xs: 3, md: 5}
        }}
      />

      <UserForm onSuccess={() => navigate('/users')}/>
    </Container>
  )
}

export default UserRegisterPage