import React, {useCallback, useState} from 'react'
import * as yup from 'yup'
import {useForm, FormProvider} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button
} from '@mui/material'
import {getResponseError} from '../../utils/api-helper'
import {useSnackbar} from 'notistack'
import api from '../../utils/axios'

export default function UserForm({user, onSuccess}) {
  const [loading, setLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()

  const userSchema = yup.object().shape({
    name: yup.string().required('Nome do usuário é obrigatório.'),
    email: yup.string().required('Insira o e-mail do usuário'),
    role: yup.string().required('Selecione o tipo de usuário'),
    password: yup.string().when([], {
      is: () => !user?.id,
      then: (schema) => schema.required('Senha é obrigatória'),
      otherwise: (schema) => schema.notRequired(),
    }),
  })


  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || ''
    }
  })

  const {
    handleSubmit,
    register,
    formState: {errors},
  } = methods

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true)
      try {
        if (user?.id) {
          delete data.password
          await api.patch(`/users/${user?.id}`, data)
          enqueueSnackbar('Usuário atualizado com sucesso', {variant: 'success'})
          onSuccess()
        } else {
          await api.post('/users', data)
          enqueueSnackbar('Usuário criado com sucesso', {variant: 'success'})
          onSuccess()
        }
      } catch (error) {
        enqueueSnackbar(getResponseError(error), {variant: 'error'})
      } finally {
        setLoading(false)
      }
    },
    [enqueueSnackbar, onSuccess, user?.id]
  )

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{width: '100%', mt: 2}}
      >
        <Grid container spacing={2}>
          <Grid item size={12}>
            <TextField
              fullWidth
              label="Nome"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item size={12}>
            <TextField
              fullWidth
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          {!user && (
            <Grid item size={12}>
              <TextField
                fullWidth
                label="Senha"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          )}

          <Grid item size={12}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-label">Tipo de Usuário</InputLabel>
              <Select
                labelId="role-label"
                label="Tipo de Usuário"
                defaultValue=""
                {...register('role')}
              >
                <MenuItem value="user">Usuário</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="analyst">Analista</MenuItem>
              </Select>
              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              loading={loading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {user?.id ? 'Atualizar Usuário' : 'Criar Usuário'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}
