import React, {useRef, useState} from 'react'
import {Container, Tabs, Tab, Box} from '@mui/material'
import CustomBreadcrumbs from '../../components/custom-breadcrumbs'
import CustomDataTable from '../../components/custom-data-table'
import {format, parseISO} from 'date-fns'
import FilterButton from '../../components/filter-button/index'
import DiagnosticFilters from '../../components/filter-form/index'
import GroupedDataPage from './grouped'

const DiagnosticsPage = () => {
  const table = useRef()
  const [filters, setFilters] = useState({})
  const filterRef = useRef()
  const [currentTab, setCurrentTab] = useState(0)

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const columns = [
    {field: 'id', headerName: 'ID', flex: 0.5},
    {field: 'device_id', headerName: 'ID do dispositivo', flex: 1},
    {field: 'city', headerName: 'Cidade', flex: 1},
    {field: 'state', headerName: 'Estado', flex: 1},
    {field: 'latency_ms', headerName: 'Latencia (ms)', flex: 1},
    {
      field: 'packet_loss',
      headerName: 'Perda de pacotes',
      flex: 1,
      renderCell: (params) => `${params?.row?.packet_loss ?? 0}%`
    },
    {field: 'quality_of_service', headerName: 'Qualidade do serviço', flex: 1},
    {
      field: 'date',
      headerName: 'Data',
      flex: 1,
      renderCell: (params) => format(parseISO(params?.row?.date), 'dd/MM/yyyy HH:mm')
    },
  ]

  const activeFilters = Object.entries(filters).filter(
    ([_, value]) => value !== '' && value !== null && value !== undefined
  )

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Diagnósticos"
        links={[{name: 'Home', href: '/dashboard'}, {name: 'Diagnósticos'}]}
        action={
          <FilterButton
            filters={activeFilters}
            onClick={() => filterRef.current.open()}
            onClear={() => setFilters({})}
          />
        }
        sx={{
          my: {xs: 3, md: 5},
        }}
      />

      <Tabs value={currentTab} onChange={handleChange} sx={{mb: 3}}>
        <Tab label="Tabela"/>
        <Tab label="Gráfico"/>
      </Tabs>

      {currentTab === 0 && (
        <Box>
          <CustomDataTable
            ref={table}
            filters={filters}
            endpoint="/diagnostics/"
            columns={columns}
          />
        </Box>
      )}

      {currentTab === 1 && (
        <GroupedDataPage filters={filters} />
      )}

      <DiagnosticFilters
        ref={filterRef}
        onFilter={setFilters}
        filters={filters}
      />
    </Container>
  )
}

export default DiagnosticsPage
