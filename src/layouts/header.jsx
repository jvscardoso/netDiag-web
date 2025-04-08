import {AppBar, Toolbar, Button, IconButton, Box} from '@mui/material'
import Logo from '../components/Logo'
import {useAuth} from "../contexts/auth/use-auth"
import {useResponsive} from "../hooks/use-responsive"
import Iconify from "../components/iconify/index"
import React from "react"
import {useRouter} from "../hooks/use-router"

export default function Header() {
  const {logout} = useAuth()
  const lgUp = useResponsive('up', 'lg')
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Logo/>
        </Box>

        <Box>
          {lgUp ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Sair
            </Button>
          ) : (
            <IconButton onClick={handleLogout}>
              <Iconify icon="mdi:power" width={24}/>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
