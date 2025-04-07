import { Tabs, Tab, Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import navConfig from './navConfig'

export default function NavHorizontal() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const currentTab = navConfig.find((tab) => pathname.startsWith(tab.path))?.path || false

  return (
    <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={currentTab} onChange={(e, value) => navigate(value)}>
        {navConfig.map((tab) => (
          <Tab key={tab.path} label={tab.label} value={tab.path} />
        ))}
      </Tabs>
    </Box>
  )
}
