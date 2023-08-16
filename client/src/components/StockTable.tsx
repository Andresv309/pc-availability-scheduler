import { useEffect, useMemo, useState } from "react";
import { CellValueChangedEvent, ColDef, ValueFormatterParams, ValueGetterParams, ISelectCellEditorParams } from "ag-grid-community";

import { deleteComputerStock, editComputerStock, getAllComputerStocks, insertComputerStock } from "../api/fetchComputerStock";
import { Computer, ComputerStock } from "../types/interfaces";
import { COMPUTER_STATE } from "../constants/emuns";
import ComputerStateRenderer from "./renderers/ComputerStateRenderer";
import { getObjKeyByValue } from "../utils/enumTransformers";
import { getAllComputers } from "../api/fetchComputers";
import { Table } from "./Table";
import App from "../App";

export function StockTable () {
  const [computersStock, setComputersStock] = useState<ComputerStock[]>([])
  const [computers, setComputers] = useState<Computer[]>([])

  useEffect(() => {
    const fetchComputersStockData = async () => {
      const computersData = await getAllComputerStocks() ?? [];
      setComputersStock(computersData);
    };

    const fetchComputersData = async () => {
      const computersData = await getAllComputers() ?? [];
      setComputers(computersData);
    };

    fetchComputersData(); 
    fetchComputersStockData(); 
  }, [])

  const indexGetter = (params : ValueGetterParams<ComputerStock>) => {
    if (!params.node || params.node.rowIndex === null) return '-'
    const index = params.node.rowIndex

    return index + 1
  }

  const selectFormatter = (e : ValueFormatterParams<ComputerStock, ComputerStock['state']>) => {
    const { data } = e
    const sessionValue = data?.state ? COMPUTER_STATE[data.state] : ''

    return sessionValue
  }

  const filterGetter = (e : ValueGetterParams<ComputerStock>) => {
    const { data } = e
    const sessionValue = data?.state ? COMPUTER_STATE[data.state] : ''

    return sessionValue
  }

  const lookupComputerKey = (computerName : string) => {
    return computers.find(computer => computer.name === computerName)?.id
  }

  const oncellValueChanged = (e : CellValueChangedEvent) => {
    const { data } = e
    console.log(data)
    editComputerStock({
      id: data.id,
      computerStock: {
        ...data,
        state: getObjKeyByValue(data.state, COMPUTER_STATE),
        computer: {
          id: lookupComputerKey(data.computer?.name)
        }
      }
    })
  }
  
  const insertItem = async () => {
    return await insertComputerStock({})
  }
  const removeItem = async ({ id } : { id : number }) => {
    await deleteComputerStock({ id })
  }

  // Applied configuration for each column
  const columnDefs = useMemo<ColDef<ComputerStock>[]>(() => [
    { headerName: '#', maxWidth: 70, pinned: 'left', lockPinned: true, lockPosition: true, valueGetter: indexGetter, filter: null, editable: false},
    { field: 'id', hide: true },
    { field: 'code', headerName: 'Código' },
    { field: 'location', headerName: 'Ubicación' },
    { field: 'state',
      headerName: 'Estado',
      cellEditor: 'agSelectCellEditor',
      cellRenderer: ComputerStateRenderer,
      valueFormatter: selectFormatter,
      filterValueGetter: filterGetter,
      cellEditorParams: {
        values: Object.values(COMPUTER_STATE),
      } as ISelectCellEditorParams,

    },
    { 
      valueGetter: params => {
        return params.data?.computer?.name
      },
      valueSetter: params => {
        console.log({misparams: params})
        params.data.computer = { name: params.newValue }
        return true;
      },
      headerName: 'Computador',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: computers.map(computer => (computer.name)),
      } as ISelectCellEditorParams,
    },
  ], [computers]);

  return (
    <App>
      <Table<ComputerStock>
        tableName="Computadores del Aula"
        columnDefs={columnDefs}
        rowData={computersStock}
        insertItem={insertItem}
        removeItem={removeItem}
        onCellValueChanged={oncellValueChanged}
      />
    </App>
  )
}