import React from 'react'
import {Badge, Button, Stack} from '@mui/material'
import PropTypes from 'prop-types'
import Iconify from '../iconify'

const FilterButton = ({onClick, onClear, filters}) => {
  return (
    <Stack alignItems="center">
      <Badge badgeContent={filters.length} color="secondary">
        <Button
          onClick={onClick}
          variant="contained"
          startIcon={<Iconify icon="ion:filter"/>}
          color="primary">
          Filtrar
        </Button>
      </Badge>

      {onClear && (
        <Button onClick={() => onClear()} style={{textAlign: 'center'}}>
          <small style={{cursor: 'pointer'}}>Limpar filtros</small>
        </Button>
      )}
    </Stack>
  )
}

FilterButton.propTypes = {
  onClick: PropTypes.func,
  onClear: PropTypes.func,
}

export default FilterButton
