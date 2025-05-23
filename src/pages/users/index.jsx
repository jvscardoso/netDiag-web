import React, {useRef, useState} from 'react'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/'
import CustomDataTable from '../../components/custom-data-table/index'
import {format, parseISO} from 'date-fns'
import {Info} from 'phosphor-react'
import UserDetails from '../../components/user-details/index'
import {ROLE_LABELS} from '../../utils/user-enums'
import {useNavigate} from 'react-router-dom'
import Iconify from '../../components/iconify/index'

const UsersPage = () => {
  const table = useRef()
  const navigate = useNavigate()

  const [selectedUser, setSelectedUser] = useState([])
  const [openDetails, setOpenDetails] = useState(false)

  const handleDetails = (row) => {
    setSelectedUser(row)
    setOpenDetails(true)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Criado em',
      flex: 1,
      renderCell: (params) => format(parseISO(params?.row?.created_at), 'dd/MM/yyyy HH:mm')
    },
    {
      field: 'role',
      headerName: 'Tipo',
      flex: 1,
      renderCell: (params) => ROLE_LABELS[params?.row?.role] || params?.row?.role,
    },
    {
      flex: 1,
      type: 'actions',
      renderCell: ({row}) => (
        <Button
          size="small"
          onClick={() => handleDetails(row)}
          variant="contained"
          startIcon={<Info/>}
          sx={{marginLeft: 1,}}>
          Detalhes
        </Button>
      )
    }
  ]

  const newUserButton = (
    <Button variant='contained' onClick={() => navigate('/users/create-or-update')}>
      Novo usuário
    </Button>
  )

  const handleSuccess = () => {
    setSelectedUser(null)
    setOpenDetails(false)
    window.location.reload()
  }

  return (
    <Container maxWidth={'xl'}>
      <CustomBreadcrumbs
        heading="Usuários"
        links={[{name: 'Home', href: '/dashboard'}, {name: 'Usuários'}]}
        sx={{
          my: {xs: 3, md: 5}
        }}
        action={newUserButton}
        mobileActions={newUserButton}
      />

      <CustomDataTable
        ref={table}
        endpoint="/users"
        columns={columns}
      />

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth>
        <DialogTitle>
          Detalhes do usuário
        </DialogTitle>
        <DialogContent>
          <UserDetails userData={selectedUser} onSuccess={handleSuccess}/>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setOpenDetails(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UsersPage