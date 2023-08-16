import { useEffect, useMemo, useState } from "react";
import { CellValueChangedEvent, ColDef, ISelectCellEditorParams, ITextCellEditorParams, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';

import { deleteStudent, editStudent, getAllStudents, insertStudent } from "../api/fetchStudents";
import SessionTypeRenderer from "./renderers/SessionTypeRenderer";
import { getObjKeyByValue } from "../utils/enumTransformers";
import { CARDID_TYPE, SESSION } from '../constants/emuns'
import CardIDType from "./renderers/CardIDTypeRenderer";
import { formatNumber } from "../utils/formatters";
import { Student } from "../types/interfaces";
import { Table } from "./Table";
import App from "../App";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

export function StudentTable () {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentData = await getAllStudents() ?? [];
      setStudents(studentData);
    };

    fetchStudentData(); 
  }, [])

  const indexGetter = (params : ValueGetterParams<Student>) => {
    if (!params.node || params.node.rowIndex === null) return '-'
    const index = params.node.rowIndex

    return index + 1
  }

  const numberFormatter = (e : ValueFormatterParams<Student>) => {
    const { data } = e
    const idNumberValue = data?.cardIdNumber ? data.cardIdNumber : ''

    // Remove non-numeric characters
    const input = idNumberValue.replace(/\D/g, "");
    const formattedInput = formatNumber(input);
    return formattedInput
  }

  const parseTextToNumber = (textValue : string) => {
    // Remove non-numeric characters
    const numberSanitizedAsText = textValue.replace(/\D/g, "").trim();
    return numberSanitizedAsText
  }

  const selectFormatter = (e : ValueFormatterParams<Student, Student['session']>) => {
    const { data } = e
    const sessionValue = data?.session ? SESSION[data.session] : ''

    return sessionValue
  }

  const filterGetter = (e : ValueGetterParams<Student>) => {
    const { data } = e
    const sessionValue = data?.session ? SESSION[data.session] : ''

    return sessionValue
  }

  const oncellValueChanged = (e : CellValueChangedEvent) => {
    const { data } = e
    editStudent({
      id: data.id,
      student: {
        ...data,
        session: getObjKeyByValue(data.session, SESSION)
      }
    })
  }
  
  const insertItem = async () => {
    return await insertStudent({})
  }
  const removeItem = async ({ id } : { id : number }) => {
    await deleteStudent({ id })
  }

  // Applied configuration for each column
  const columnDefs = useMemo<ColDef<Student>[]>(() => [
    { headerName: '#', maxWidth: 70, pinned: 'left', lockPinned: true, lockPosition: true, valueGetter: indexGetter, filter: null, editable: false},
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Nombre'},
    { field: 'cardIdType',
      headerName: 'Tipo de Documento',
      cellEditor: 'agSelectCellEditor',
      cellRenderer: CardIDType,
      cellEditorParams: {
        values: Object.keys(CARDID_TYPE)
      }
    },
    { field: 'cardIdNumber',
      headerName: 'No. de Documento',
      cellEditor: 'agTextCellEditor',
      valueFormatter: numberFormatter,
      cellEditorParams: {
        maxLength: 10,
        parseValue: parseTextToNumber,   
      } as ITextCellEditorParams
    },
    { field: 'session',
      headerName: 'Jornada',
      valueFormatter: selectFormatter,
      filterValueGetter: filterGetter,
      cellRenderer: SessionTypeRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: Object.values(SESSION),
      } as ISelectCellEditorParams
    }
  ], []);


  return (
    <App>
      <Table<Student>
        tableName="Estudiantes"
        columnDefs={columnDefs}
        rowData={students}
        insertItem={insertItem}
        removeItem={removeItem}
        onCellValueChanged={oncellValueChanged}
      />
    </App>
  )
}
