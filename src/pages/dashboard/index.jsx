import React from 'react'
import {Container, Stack, Typography} from "@mui/material"
import {useAuth} from "../../contexts/auth/use-auth"
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/"

const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading={`Bem vindo, ${user.name}`}
        links={[{name: 'Home'}]}
        sx={{
          my: {xs: 3, md: 5}
        }}
      />

      <Stack>
        <Typography>
          Home
        </Typography>
      </Stack>
    </Container>
  )
}

export default DashboardPage