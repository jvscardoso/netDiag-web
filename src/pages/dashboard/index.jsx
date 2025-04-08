import React, {useEffect, useState} from 'react'
import {Container, Grid} from '@mui/material'
import {useAuth} from '../../contexts/auth/use-auth'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import InfoCard from '../../components/info-card'
import api from '../../utils/axios'
import {getResponseError} from '../../utils/api-helper'
import {useSnackbar} from 'notistack'

const DashboardPage = () => {
  const {user} = useAuth()
  const {enqueueSnackbar} = useSnackbar()

  const [metrics, setMetrics] = useState({
    total_diagnostics: 0,
    avg_latency: 0,
    avg_packet_loss: 0,
    avg_quality_of_service: 0,
  })

  const fetchDashboardMetrics = async () => {
    try {
      const response = await api.get('/dashboard')
      setMetrics(response.data)
    } catch (error) {
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    }
  }

  useEffect(() => {
    fetchDashboardMetrics()
  }, [])

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading={`Bem vindo, ${user?.name}`}
        links={[{name: 'Início'}, {name: 'Visão geral'}]}
        sx={{ my: {xs: 3, md: 5} }}
      />

      <Grid container spacing={3}>
        <Grid item>
          <InfoCard
            title="Diagnósticos"
            value={metrics.total_diagnostics}
            icon="ic:twotone-info"
          />
        </Grid>

        <Grid item>
          <InfoCard
            title="Latência Média (ms)"
            value={metrics.avg_latency.toFixed(2)}
            icon="fluent:gauge-20-regular"
          />
        </Grid>

        <Grid item>
          <InfoCard
            title="Perda de Pacotes"
            value={`${(metrics.avg_packet_loss * 100)}%`}
            icon="duo-icons:box-2"
          />
        </Grid>

        <Grid item>
          <InfoCard
            title="Qualidade de Serviço"
            value={metrics.avg_quality_of_service.toFixed(2)}
            icon="solar:medal-ribbon-star-line-duotone"
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage
