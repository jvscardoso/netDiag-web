import React from 'react'
import {Typography, Button, Container} from '@mui/material'
import {useNavigate} from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="md" sx={{textAlign: 'center', py: 10}}>
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" sx={{mb: 4}}>
        A página que você está tentando acessar não existe ou você não deveria estar aqui.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Voltar para o Início
      </Button>
    </Container>
  )
}

export default NotFoundPage
