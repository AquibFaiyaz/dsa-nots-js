import { PropsWithChildren } from 'react'
import { Box, Toolbar } from '@mui/material'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}


