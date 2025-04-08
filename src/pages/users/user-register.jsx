import React from 'react'
import {Container, IconButton, Stack, Typography} from '@mui/material'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import UserForm from '../../components/user-form'
import Iconify from '../../components/iconify/index'

const UserRegisterPage = () => {
  const handleGoBack = () => {
    window.history.back()
  }

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

      <UserForm/>
    </Container>
  )
}

export default UserRegisterPage