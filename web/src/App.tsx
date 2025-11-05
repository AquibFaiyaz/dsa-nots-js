import { Routes, Route } from 'react-router-dom'
import { Typography } from '@mui/material'
import Layout from './components/Layout'
import ProblemDetail from './components/ProblemDetail'
import Home from './components/Home'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
      </Routes>
    </Layout>
  )
}


