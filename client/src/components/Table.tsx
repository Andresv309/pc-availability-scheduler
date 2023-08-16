import { CellValueChangedEvent, ColDef, GetRowIdParams } from 'ag-grid-community';
import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

interface TableProps<T> {
  tableName: string;
  rowData: T[];
  columnDefs: ColDef<T>[];
  onCellValueChanged: (e: CellValueChangedEvent) => void;
  insertItem?: () => Promise<T | null>;
  removeItem?: ({ id } : { id : number }) => Promise<void>;
}

export function Table<T> ({
  tableName,
  rowData,
  columnDefs,
  onCellValueChanged,
  insertItem,
  removeItem
} : TableProps<T>
) {
  const gridRef = useRef<AgGridReact | null>(null)

  // Applied configurations for all columns
  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
    
    // Makes all columns to fit the width view, resulting in no horizontal bar
    flex: 1,
    floatingFilter: true,
    filterParams: {
      buttons: ['clear']
    }
  }), []);

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id
  }, [])

  const onAdd = useCallback(async() => {
    if (gridRef.current == null) return
    console.log("dasdas")
    
    if (insertItem) {
      const newItem = await insertItem()
      if (newItem) {
        gridRef.current.api.applyTransaction({
          add: [newItem],
          addIndex: 0,
        })
      }
    }

    // Trigger recalculate for columns in this case I use it for row index
    gridRef.current!.api.onSortChanged()
  }, [insertItem])

  const onRemove = useCallback(() => {
    if (gridRef.current == null) return
    const selectedRows = gridRef.current.api.getSelectedRows()

    if (removeItem) {
      selectedRows.forEach(async (item) => {
        await removeItem({ id: item.id })
      })
      gridRef.current.api.applyTransaction({
        remove: selectedRows
      })
    }

    // Trigger recalculate for columns in this case I use it for row index
    gridRef.current!.api.onSortChanged()
  }, [removeItem])

  return (
    <div className="flex flex-col gap-2 h-full px-4">
      <h1 className="text-2xl mb-4 font-medium italic">
        {tableName}
      </h1>

      <div className="flex gap-2">
        {insertItem && <button className='hover:bg-emerald-600 bg-emerald-700 rounded px-2 py-1' onClick={onAdd}>Añadir Fila</button>}
        {removeItem && <button className='hover:bg-red-600 bg-red-700 rounded px-2 py-1' onClick={onRemove}>Borrar Selecionados</button>}
      </div>

      <AgGridReact ref={gridRef}
        className="ag-theme-balham"
        animateRows={true}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}          
        rowData={rowData}

        pagination={true}
        
        // Allows the user to select multiple rows
        rowSelection="multiple"

        // Uses this ids for keeping columns state when inserting new records and doing transaction operations, similar to react key
        getRowId={getRowId}

        // Makes the cells flash with green color when they're updated
        enableCellChangeFlash={true}

        // Waiting time until aplying a transaction operation (ms)
        asyncTransactionWaitMillis={5000}

        // Filter popup display reference, this avoids popup to clip when grid is too small
        popupParent={document.body}

        // Personalizes message shown when there're not row data
        noRowsOverlayComponent={() => (<>No hay Registros que Mostrar</>)}

        onCellValueChanged={onCellValueChanged}

        // Useful for reordering the indexes of rows when sorting
        onSortChanged={(e) => e.api.refreshCells()}
      />
    </div>
  )
}
