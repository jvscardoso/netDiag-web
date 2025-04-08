import React, {useEffect, useState, useImperativeHandle, forwardRef} from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {Box, Stack} from '@mui/material'
import api from '../../utils/axios'
import {getResponseError} from '../../utils/api-helper'
import {useSnackbar} from 'notistack'

const CustomDataTable = forwardRef(({endpoint, columns, filters}, ref) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const {enqueueSnackbar} = useSnackbar()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters || {}).filter(([_, value]) => value !== '')
      )

      const params = {
        ...cleanedFilters,
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      }

      const response = await api.get(endpoint, {params})
      const data = response?.data

      setRows(data.items || data.results || [])
    } catch (error) {
      console.error(error)
      enqueueSnackbar(getResponseError(error), {variant: 'error'})
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: fetchData,
  }))

  useEffect(() => {
    fetchData()
  }, [endpoint, filters, paginationModel])

  return (
    <Box sx={{height: 500, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        paginationMode="server"
        rowCount={rows.length}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        getRowId={(row) => row.id}
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Não há itens para exibir
            </Stack>
          ),
        }}
      />
    </Box>
  )
})

CustomDataTable.displayName = 'CustomDataTable'

CustomDataTable.defaultProps = {
  filters: {},
}

export default CustomDataTable
