import React from 'react'
import {Container, Stack, Typography} from "@mui/material"
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/"

const UsersPage = () => {
  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading="Usuários"
        links={[{ name: 'Home', href: '/dashboard' }, { name: 'Usuários' }]}
        sx={{
          my: {xs: 3, md: 5}
        }}
      />

      <Stack>
        <Typography>
          Listagem de usuários
        </Typography>
      </Stack>
    </Container>
  )
}

export default UsersPage