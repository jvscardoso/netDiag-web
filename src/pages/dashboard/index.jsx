import React from 'react'
import {Button, Stack, Typography} from "@mui/material"
import {useAuth} from "../../contexts/auth/useAuth"
import {useRouter} from "../../hooks/use-router"

const DashboardPage = () => {
  const { logout } = useAuth()
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
      <Stack>
        <Typography>
          Home
        </Typography>
        <Button onClick={handleLogout} variant="contained">
          Sair
        </Button>
      </Stack>

    )
}

export default DashboardPage