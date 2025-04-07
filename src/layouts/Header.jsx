import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import Logo from '../components/Logo'

export default function Header() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
          <Typography variant="h6" sx={{ ml: 2 }}>
            netDiag
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
