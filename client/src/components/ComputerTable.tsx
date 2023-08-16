import { useEffect, useMemo, useState } from "react";
import { CellValueChangedEvent, ColDef, ValueGetterParams } from "ag-grid-community";

import { deleteComputer, editComputer, getAllComputers, insertComputer } from "../api/fetchComputers";
import { Computer } from "../types/interfaces";
import { Table } from "./Table";
import App from "../App";

export function ComputerTable () {
  const [computers, setComputers] = useState<Computer[]>([])

  useEffect(() => {
    const fetchComputersData = async () => {
      const computersData = await getAllComputers() ?? [];
      setComputers(computersData);
    };

    fetchComputersData(); 
  }, [])

  const indexGetter = (params : ValueGetterParams<Computer>) => {
    if (!params.node || params.node.rowIndex === null) return '-'
    const index = params.node.rowIndex

    return index + 1
  }

  const oncellValueChanged = (e : CellValueChangedEvent) => {
    const { data } = e
    editComputer({
      id: data.id,
      computer: data
    })
  }
  
  const insertItem = async () => {
    return await insertComputer({})
  }
  const removeItem = async ({ id } : { id : number }) => {
    await deleteComputer({ id })
  }

  // Applied configuration for each column
  const columnDefs = useMemo<ColDef<Computer>[]>(() => [
    { headerName: '#', maxWidth: 70, pinned: 'left', lockPinned: true, lockPosition: true, valueGetter: indexGetter, filter: null, editable: false},
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Nombre' },
    { field: 'brand', headerName: 'Marca' },
    { field: 'processor', headerName: 'Procesador' },
    { field: 'ram', headerName: 'Ram' },
    { field: 'hasGraphicsCard', headerName: 'Tarjeta Gráfica' }
  ], []);

  return (
    <App>
      <Table<Computer>
        tableName="Tipos de Computadores"
        columnDefs={columnDefs}
        rowData={computers}
        insertItem={insertItem}
        removeItem={removeItem}
        onCellValueChanged={oncellValueChanged}
      />
    </App>
  )
}