import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  InputAdornment
} from '@mui/material'

const DiagnosticFilters = forwardRef(({onFilter}, ref) => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    device_id: '',
    city: '',
    state: '',
    latency_ms: '',
    packet_loss: '',
    qos_filter: '',
    date: ''
  })

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }))

  const handleChange = (field) => (event) => {
    setFilters({...filters, [field]: event.target.value})
  }

  const handleClear = (field) => () => {
    setFilters({...filters, [field]: ''})
  }

  const handleSubmit = () => {
    const formattedFilters = {
      ...filters,
    }

    if (filters.date) {
      formattedFilters.date = new Date(filters.date).toISOString()
    }

    Object.keys(formattedFilters).forEach((key) => {
      if (!formattedFilters[key]) delete formattedFilters[key]
    })

    onFilter(formattedFilters)
    setOpen(false)
  }

  const handleClose = () => {
    const emptyFilters = {
      device_id: '',
      city: '',
      state: '',
      latency_ms: '',
      packet_loss: '',
      qos_filter: '',
      date: ''
    }
    setFilters(emptyFilters)
    onFilter({})
    setOpen(false)
  }

  const renderTextField = (label, field, type = 'text') => (
    <TextField
      label={label}
      type={type}
      value={filters[field]}
      onChange={handleChange(field)}
      size="small"
      fullWidth
      InputProps={{
        endAdornment: filters[field] && (
          <InputAdornment position="end">
            <Button
              onClick={handleClear(field)}
              size="small"
            >
              Limpar
            </Button>
          </InputAdornment>
        )
      }}
    />
  )

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>Filtrar Diagnósticos</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
          {renderTextField('ID do Dispositivo', 'device_id')}
          {renderTextField('Cidade', 'city')}
          {renderTextField('Estado', 'state')}
          {renderTextField('Latência (ms)', 'latency_ms', 'number')}
          {renderTextField('Perda de Pacotes (%)', 'packet_loss', 'number')}
          <FormControl size="small" fullWidth>
            <InputLabel>QoS</InputLabel>
            <Select
              variant="standard"
              value={filters.qos_filter}
              onChange={handleChange('qos_filter')}
              label="QoS"
              endAdornment={filters.qos_filter && (
                <InputAdornment position="end">
                  <Button
                    onClick={handleClear(field)}
                    size="small"
                  >
                    Limpar
                  </Button>
                </InputAdornment>
              )}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="good">Boa</MenuItem>
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="bad">Ruim</MenuItem>
            </Select>
          </FormControl>
          {renderTextField('Data', 'date', 'date')}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button onClick={handleSubmit} variant="contained">Filtrar</Button>
      </DialogActions>
    </Dialog>
  )
})

DiagnosticFilters.displayName = 'DiagnosticFilters'

export default DiagnosticFilters
