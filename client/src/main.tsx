import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AssignmentTable } from './components/AssignmentTable.tsx'
import { ComputerTable } from './components/ComputerTable.tsx'
import { StudentTable } from './components/StudentTable.tsx'
import { StockTable } from './components/StockTable.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <StudentTable />
  },
  {
    path: "/estudiantes",
    element: <StudentTable />
  },
  {
    path: "/computadores",
    element: <ComputerTable />
  },
  {
    path: "/aula",
    element: <StockTable />
  },
  {
    path: "/asignacion",
    element: <AssignmentTable />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
