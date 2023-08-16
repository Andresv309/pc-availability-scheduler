import { useEffect, useMemo, useState } from "react";
import { CellValueChangedEvent, ColDef, ValueGetterParams } from "ag-grid-community";

import { getAllComputerStocks } from "../api/fetchComputerStock";
import { ComputerStock, Student } from "../types/interfaces";
import { editStudent, getAllStudents } from "../api/fetchStudents";
import SessionTypeRenderer from "./renderers/SessionTypeRenderer";
import { SESSION } from "../constants/emuns";
import { Table } from "./Table";
import App from "../App";

export function AssignmentTable () {
  const [computersStock, setComputersStock] = useState<Partial<ComputerStock>[]>([])
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const fetchComputersStockData = async () => {
      const computersData = await getAllComputerStocks() ?? [];

      const computersDataModified = [
        ...computersData,
        {id: 0, code: 'Sin Asignación'}
      ]

      setComputersStock(computersDataModified);
    };

    const fetchComputersData = async () => {
      const studentsData = await getAllStudents() ?? [];
      setStudents(studentsData);
    };

    fetchComputersData(); 
    fetchComputersStockData(); 
  }, [])

  const indexGetter = (params : ValueGetterParams<Student>) => {
    if (!params.node || params.node.rowIndex === null) return '-'
    const index = params.node.rowIndex

    return index + 1
  }

  const oncellValueChanged = (e : CellValueChangedEvent<Student>) => {
    const { data } = e
    console.log(data)

    const payload = data.computerStock?.id ? data : {...data, computerStock: null}
    editStudent({
      id: data.id,
      student: payload
    })
  }
  
  // Applied configuration for each column
  const columnDefs = useMemo<ColDef<Student>[]>(() => [
    { headerName: '#', maxWidth: 70, pinned: 'left', lockPinned: true, lockPosition: true, valueGetter: indexGetter, filter: null, editable: false},
    { field: 'name', headerName: 'Nombre', editable: false },
    { field: 'session',
      headerName: 'Jornada',
      editable: false,
      cellRenderer: SessionTypeRenderer,
      valueGetter: params => {
        const session = params.data?.session
        const sessionShown = session ? SESSION[session] : ''

        return sessionShown
      },
    },
    { 
      field: 'computerStock.id',
      headerName: 'Computador Asignado',
      filter: false,
      valueSetter: params => {
        const { newValue } = params
        console.log({misparams: params})

        if (!newValue || newValue === '') {
          params.data.computerStock = { id: 0 }
        } else {
          params.data.computerStock = { code: computersStock.find(computerStock => computerStock.id === newValue)?.code, id: newValue }
        }

        return true;
      },
      valueFormatter: (data) => {
        const { value } = data
        if (!value || value === 0) return 'Sin Asignación'
        return `${computersStock.find(computerStock => computerStock.id === value)?.code}`
      },

      cellEditorSelector: (params) => {
        console.log({params})
        const session = params.data.session
        const studentInSameSession = students.filter(student => {
          if (student.computerStock?.id === 0) return false
          return student.session === session
        })
        const availableComputersForSession = computersStock.filter(computerStock => {
          const { id } = computerStock
          const isOccupied = studentInSameSession.find(student => student.computerStock?.id === id)
          return !isOccupied
        })

        const availableIdsComputersForSession = availableComputersForSession.map(computer => computer.id)
        const currentComputerStockId = params.data.computerStock?.id

        const selectAvailableIdsComputersForSession = currentComputerStockId === 0 || !currentComputerStockId
        ? availableIdsComputersForSession
        : [...availableIdsComputersForSession, currentComputerStockId]

        return {
          component: 'agSelectCellEditor',               
          params: {
            values: selectAvailableIdsComputersForSession
          },
        }
      },
      // singleClickEdit: true,
    },
  ], [computersStock, students]);

  return (
    <App>
      <Table<Student>
        tableName="Asignación de Computadores"
        columnDefs={columnDefs}
        rowData={students}
        onCellValueChanged={oncellValueChanged}
      />
    </App>
  )
}