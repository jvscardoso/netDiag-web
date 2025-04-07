import React from 'react'
import {Container, Stack, Typography} from "@mui/material"
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/"

const DiagnosticsPage = () => {
  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading="Diagnósticos"
        links={[{ name: 'Home', href: '/dashboard' }, { name: 'Diagnósticos' }]}
        sx={{
          my: {xs: 3, md: 5}
        }}
      />

      <Stack>
        <Typography>
          Diagnósticos de rede
        </Typography>
      </Stack>
    </Container>
  )
}

export default DiagnosticsPage