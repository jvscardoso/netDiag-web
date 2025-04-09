import React from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useAuth} from '../../contexts/auth/use-auth'
import {useSnackbar} from 'notistack'
import {useNavigate} from 'react-router-dom'
import {getResponseError} from '../../utils/api-helper'
import AuthLayout from '../../layouts/auth-layout'
import Stack from '@mui/material/Stack'

const LoginPage = () => {
  const {login} = useAuth()
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()

  const loginSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
  })

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/dashboard')
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {
        variant: 'error'
      })
    }
  }

  return (
    <AuthLayout>
      <Container maxWidth="lg" disableGutters>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" gutterBottom>
            Acesse sua conta
          </Typography>
          <Paper elevation={3} sx={{padding: 4, maxWidth: 600,}}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{display: 'flex', flexDirection: 'column', gap: 2}}
            >
              <TextField
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />

              <TextField
                label="Senha"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Entrar
              </Button>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </AuthLayout>
  )
}

export default LoginPage
