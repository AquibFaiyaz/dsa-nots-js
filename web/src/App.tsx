import { Routes, Route } from 'react-router-dom'
import { Typography } from '@mui/material'
import Layout from './components/Layout'
import ProblemDetail from './components/ProblemDetail'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Typography sx={{ p: 3 }}>Select a problem from the left.</Typography>} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
      </Routes>
    </Layout>
  )
}


