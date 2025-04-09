import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, CircularProgress } from '@mui/material'
import Chart from 'react-apexcharts'
import api from '../../utils/axios'
import { getResponseError } from '../../utils/api-helper'
import { useSnackbar } from 'notistack'

const GroupedDataPage = ({filters}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchGroupedData = async () => {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams(filters).toString()
        const response = await api.get(`/diagnostics/grouped?${queryParams}`)
        setData(response.data || [])
      } catch (error) {
        enqueueSnackbar(getResponseError(error), { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchGroupedData()
  }, [enqueueSnackbar])

  const extractSeries = (field) => data.map((item) => item[field])
  const extractCategories = () => data.map((item) => item.day)

  const commonOptions = (title) => ({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
    },
    title: {
      text: title,
      align: 'left',
    },
    xaxis: {
      categories: extractCategories(),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toFixed(2),
      },
    },
  })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Dados Agregados por Dia
      </Typography>

      <Grid container spacing={4}>
        <Grid item size={{ base: 12, md: 6 }}>
          <Chart
            options={commonOptions('Latência Média (ms)')}
            series={[{ name: 'Latência', data: extractSeries('avg_latency') }]}
            type="bar"
            height={300}
          />
        </Grid>

        <Grid item size={{ base: 12, md: 6 }}>
          <Chart
            options={commonOptions('Perda de Pacotes Média (%)')}
            series={[{ name: 'Perda de Pacotes', data: extractSeries('avg_packet_loss') }]}
            type="bar"
            height={300}
          />
        </Grid>

        <Grid item size={{ base: 12, md: 6 }}>
          <Chart
            options={commonOptions('Qualidade de Serviço Média')}
            series={[{ name: 'QoS', data: extractSeries('avg_quality_of_service') }]}
            type="bar"
            height={300}
          />
        </Grid>

        <Grid item size={{ base: 12, md: 6 }}>
          <Chart
            options={commonOptions('Total de Diagnósticos por Dia')}
            series={[{ name: 'Total', data: extractSeries('total') }]}
            type="bar"
            height={300}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default GroupedDataPage
