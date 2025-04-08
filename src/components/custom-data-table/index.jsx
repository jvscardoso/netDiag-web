import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import {DataGrid, GridFooterContainer} from '@mui/x-data-grid'
import {Box, Stack, Typography} from '@mui/material'
import api from '../../utils/axios'

function CustomFooter({ rowCount }) {
  return (
    <GridFooterContainer>
      <Box sx={{ pl: 2, py: 1 }}>
        <Typography variant="body2">
          Total de {rowCount} {rowCount === 1 ? 'item' : 'itens'}
        </Typography>
      </Box>
    </GridFooterContainer>
  )
}

const CustomDataTable = forwardRef(({ endpoint, columns, filters }, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [page, setPage] = useState(0)

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = {
        ...filters,
        limit: pageSize,
        offset: page * pageSize,
      }

      const response = await api.get(endpoint, { params })
      const data = response.data

      setRows(data.items || data.results || [])
      setRowCount(data.total || data.count || 0)
      setError(null)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: fetchData,
  }))

  useEffect(() => {
    fetchData()
  }, [endpoint, filters, page, pageSize])

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pagination
          pageSize={pageSize}
          page={page}
          rowCount={rowCount}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          pageSizeOptions={[]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          hideFooterPagination
          getRowId={(row) => row.id}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Não há items para exibir
              </Stack>
            ),
            footer: () => <CustomFooter rowCount={rows.length} />
          }}
        />

      )}
    </Box>
  )
})

CustomDataTable.displayName = 'CustomDataTable'

CustomDataTable.defaultProps = {
  filters: {},
}

export default CustomDataTable
