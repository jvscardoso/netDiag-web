const navConfig = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'ic:round-dashboard',
    role: ['admin', 'user', 'analyst']
  },
  {
    label: 'Diagnósticos',
    path: '/diagnostics',
    icon: 'fluent:clipboard-pulse-24-regular',
    role: ['admin', 'analyst']
  },
  {
    label: 'Usuários',
    path: '/users',
    icon: 'mdi:account-group',
    role: ['admin']
  },
  {
    label: 'Perfil',
    path: '/profile',
    icon: 'ic:twotone-person',
    role: ['admin', 'analyst', 'user']
  }
]

export default navConfig
