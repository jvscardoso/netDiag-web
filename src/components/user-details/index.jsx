import React, {useCallback, useState} from 'react'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog
} from '@mui/material'
import {format, parseISO} from 'date-fns'
import {ROLE_LABELS} from '../../utils/user-enums'
import {useAuth} from '../../contexts/auth/use-auth'
import api from '../../utils/axios'
import {useSnackbar} from 'notistack'
import {getResponseError} from '../../utils/api-helper'
import ConfirmDialog from '../confirmation-dialog/index'
import UserForm from '../user-form/index'

const UserDetails = ({userData, onSuccess}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useAuth()
  const {enqueueSnackbar} = useSnackbar()

  const handleUpdate = () => {
    setOpenForm(true)
  }

  const handleDelete = useCallback(async () => {
    setIsLoading(true)
    try {
      await api.delete(`/users/${userData?.id}`)
      onSuccess()
      enqueueSnackbar('Usuário excluído com sucesso', {variant: 'success'})
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setIsLoading(false)
    }
  }, [enqueueSnackbar, onSuccess, userData?.id])

  return (
    <Container sx={{p: 3}}>
      <Grid container spacing={1} sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Grid item size={12}>
          <Typography variant="body2" color="text.secondary">Nome</Typography>
          <Typography variant="subtitle2">{userData?.name}</Typography>
        </Grid>

        <Grid item size={6}>
          <Typography variant="body2" color="text.secondary">Tipo</Typography>
          <Typography variant="subtitle2">{ROLE_LABELS[userData?.role]}</Typography>
        </Grid>

        <Grid item size={6}>
          <Typography variant="body2" color="text.secondary">E-mail</Typography>
          <Typography variant="subtitle2">{userData?.email}</Typography>
        </Grid>

        <Grid item size={12}>
          <Typography variant="body2" color="text.secondary">Criado em</Typography>
          <Typography variant="subtitle2">
            {format(parseISO(userData?.created_at), 'dd/MM/yyyy HH:mm')}
          </Typography>
        </Grid>

        {userData.deleted_at && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">Deletado em</Typography>
            <Typography variant="subtitle2">
              {format(parseISO(user?.deleted_at), 'dd/MM/yyyy HH:mm')}
            </Typography>
          </Grid>
        )}

        {user?.role === 'admin' && (
          <Stack direction="row" spacing={1}>
            <Grid item size={12}>
              <Button variant="contained" onClick={handleUpdate}>
                Editar
              </Button>
            </Grid>
            <Grid item size={12}>
              <Button variant="contained" onClick={() => setConfirmDelete(true)}>
                Bloquear
              </Button>
            </Grid>
          </Stack>
        )}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>
          Editar usuário
        </DialogTitle>
        <DialogContent>
          <UserForm user={userData} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setOpenForm(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Confirmar ação"
        content="Deseja excluir o usuário?"
        action={
          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setConfirmDelete(false)}
            >
              Não
            </Button>

            <Button
              loading={isLoading}
              variant="contained"
              onClick={() => {
                handleDelete()
              }}
            >
              Sim
            </Button>
          </DialogActions>
        }
        showCancelButton={false}
      />
    </Container>
  )
}

export default UserDetails
