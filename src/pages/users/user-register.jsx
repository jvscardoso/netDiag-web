import React from 'react'
import {Container, Stack, Typography} from "@mui/material"
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/"

const UserRegisterPage = () => {
  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading="Novo usuário"
        links={[{ name: 'Home', href: '/dashboard' }, { name: 'Usuários', href: 'users' }, {name: 'Novo usuário '}]}
        sx={{
          my: {xs: 3, md: 5}
        }}
      />

      <Stack>
        <Typography>
          Criar/Editar usuários
        </Typography>
      </Stack>
    </Container>
  )
}

export default UserRegisterPage