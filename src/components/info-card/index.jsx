import React from 'react'
import { Card, Typography, Stack } from '@mui/material'
import Iconify from '../iconify'

const InfoCard = ({ title, value, icon }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        width: 260,
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
        >
          {value}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Iconify icon={icon} width={24} height={24} />
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default InfoCard
