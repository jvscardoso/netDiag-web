import { Box, Container } from '@mui/material'
import Header from './Header'
import NavHorizontal from './NavHorizontal'

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <NavHorizontal />

      <Container maxWidth={false} sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  )
}
