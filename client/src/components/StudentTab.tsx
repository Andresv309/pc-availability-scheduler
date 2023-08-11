import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Student, fetchStudents } from "../api/fetch";
import { TabPanel } from "@tremor/react";
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GetRowIdParams, ValueGetterParams } from 'ag-grid-community';
import { SESSION } from '../constants/emuns'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface StudentColDef extends ColDef {
//   // field: (keyof Student);
//   field: (keyof Student) | "index";
// }

export function StudentTab () {
  const [students, setStudents] = useState<Student[]>([])
  const gridRef = useRef<AgGridReact | null>(null)

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentData = await fetchStudents() ?? [];
      const studentDataWithIndex = studentData.map((student, indx) => ({...student, index: indx + 1}))

      setStudents(studentDataWithIndex);
    };

    fetchStudentData(); 
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const sessionCellFormatter = (params : any) => {
  //   const session = SESSION[params.value as keyof typeof SESSION] ?? '-'
  //   return session
  // }

  const sessionCellValue = (params : ValueGetterParams) => {
    const session = SESSION[params.data.session as keyof typeof SESSION] ?? '-'
    // console.log(params)
    return session
  }

  // Avoid unnecesary rendereres when doing things like moving columns
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useMyComp = (params : any) => {
    const renderCountRef = useRef(1)
    return (
      <><b>({renderCountRef.current++})</b>{params.value}</>
    )
  }

  const indexGetter = (params : ValueGetterParams) => {
    if (!params.node || params.node.rowIndex === null) return '-'
    const index = params.node.childIndex

    return index + 1
    // (p) => p.node != null ? p.node.rowIndex + 1: '-'
  }

  const oncellValueChanged = (p) => {
    console.log(p)
  }


  // Applied configuration for each column
  const columnDefs: ColDef[] = useMemo(() => [
    // { field: 'index', headerName: '#', pinned: 'left', lockPinned: true, lockPosition: true },
    { headerName: '#', maxWidth: 70, valueGetter: indexGetter, filter: null},
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Nombre' },
    { field: 'cardIdType', headerName: 'Tipo de Documento' },
    { field: 'cardIdNumber', headerName: 'No. de Documento' },
    { field: 'session', headerName: 'Jornada', valueGetter: sessionCellValue }
  ], []);

  // Applied configurations for all columns
  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,

    // Makes all columns to fit the width view, resulting in no horizontal bar
    flex: 1,
    // cellDataType: false,
    // cellRenderer: memo(useMyComp),
    floatingFilter: true,
    filterParams: {
      buttons: ['clear']
    }
  }), []);

  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id
  }, [])

  const onRemove = useCallback(() => {
    if (gridRef.current == null) return

    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id)
    const newStudentsList = students.filter(student => selectedIds.indexOf(student.id) < 0)
    console.log({selectedNodes, selectedIds})

    setStudents(newStudentsList)
  }, [students])

  const onUpdate = useCallback(() => {
    if (gridRef.current == null) return

    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map(node => node.data.id)
    const newStudentsList = students.filter(student => selectedIds.indexOf(student.id) < 0)
    console.log({selectedNodes, selectedIds})

    setStudents(newStudentsList)
  }, [students])

  return (
    <TabPanel >
      <div className="ag-theme-alpine h-96">
        <div className="flex gap-2">
          <button className="bg-white" onClick={onRemove}>Remove Selected</button>
          <button className="bg-white" onClick={onUpdate}>Update Selected</button>
        </div>

        <AgGridReact ref={gridRef}
          className="ag-theme-alpine"
          animateRows={true}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}          
          rowData={students}

          pagination={true}
          
          // Allows the user to select multiple rows
          rowSelection="single"

          // Uses this ids for keeping columns state when inserting new records and doing transaction operations
          getRowId={getRowId}

          // Makes the cells flash with green color when they're updated
          enableCellChangeFlash={true}

          // Waiting time until aplying a transaction operation (ms)
          asyncTransactionWaitMillis={5000}

          // Filter popup display reference, this avoids popup to clip when grid is too small
          popupParent={document.body}

          // Personalizes message shown when there're not row data
          noRowsOverlayComponent={() => (<>No hay Registros que Mostrar</>)}

          onCellValueChanged={oncellValueChanged}
        />
      </div>
    </TabPanel>
  )
}

// // import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
// import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
// import { Student, fetchStudents } from "../api/fetch";
// import { TabPanel } from "@tremor/react";
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef } from 'ag-grid-community';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface StudentColDef extends ColDef {
//   field: keyof Student;
// }

// // const MyReactEditor = memo(forwardRef((props, ref) => {

// //   const [value, setValue] = useState(parseInt(props.value));
// //   const refInput = useRef(null);

// //   // Cell Editor interface, that the grid calls
// //   useImperativeHandle(ref, () => {
// //       return {
// //           // the final value to send to the grid, on completion of editing
// //           getValue() {
// //               // this simple editor doubles any value entered into the input
// //               return value;
// //           }
// //       };
// //   });

// //   const onChangeListener = useCallback(event => setValue(event.target.value), []);
// //   useEffect(() => refInput.current.focus(), []);

// //   return (
// //       <input type="number" className="my-editor"
// //           ref={refInput}
// //           value={value}
// //           onChange={onChangeListener}
// //       />
// //   );
// // }));


// export function StudentTab () {
//   const [students, setStudents] = useState<Student[]>([])

//   // const [columnDefs] = useState([
//   //   { field: 'id' },
//   //   { field: 'name' },
//   //   { field: 'cardIdType' },
//   //   { field: 'cardIdNumber' },
//   //   { field: 'session' }
//   // ])

//   const columnDefs: StudentColDef[] = useMemo(() => [
//     { field: 'id' },
//     { field: 'name' },
//     { field: 'cardIdType' },
//     { field: 'cardIdNumber' },
//     { field: 'session' }
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     resizable: true,
//     sortable: true,
//     editable: true,
    
//     flex: 1,
//     cellDataType: false,
    
//   }), []);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       const studentData = await fetchStudents() ?? [];
//       setStudents(studentData);
//     };

//     fetchStudentData(); 
//   }, [])

//   const detailGridOptions = useMemo(() => ({
//     rowSelection: "multiple",
//     suppressRowClickSelection: true,
//     enableRangeSelection: true,
//     pagination: true,
//     paginationAutoPageSize: true,
//     // columnDefs: [
//     //     {
//     //         field: "callId",
//     //         checkboxSelection: true
//     //     },
//     //     {
//     //         field: "direction",
//     //         cellRenderer: MyRenderer
//     //     },
//     //     {
//     //         field: "number",
//     //         minWidth: 150
//     //     },
//     //     {
//     //         field: "duration",
//     //         valueFormatter: "x.toLocaleString() + 's'"
//     //     },
//     //     {
//     //         field: "switchCode",
//     //         minWidth: 150
//     //     }
//     // ],
//     defaultColDef: {
//         sortable: true,
//         flex: 1
//     }
// }), []);



//   // const autoGroupColumnDef = useMemo(() => ({
//   //   cellRendererParams: {
//   //       suppressCount: true,
//   //       checkbox: true
//   //   },
//   //   field: 'session',
//   //   width: 300
//   // }), []);

// //   const detailCellRendererParams = useMemo(() => ({
// //     detailGridOptions: detailGridOptions,
// //     getDetailRowData: params => params.successCallback(params.data.callRecords)
// // }), []);

//   return (
//     <TabPanel >
//       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
//         <AgGridReact
//           className="ag-theme-alpine"
//           animateRows={true}
//           columnDefs={columnDefs}
//           defaultColDef={defaultColDef}
//           // enableRangeSelection={true}
//           rowData={students}
//           rowSelection="multiple"
//           suppressRowClickSelection={true}


//           // detailCellRendererParams={detailCellRendererParams}
//           masterDetail={true}
//           autoGroupColumnDef={autoGroupColumnDef}
//           rowGroupPanelShow="always"
//           // enableRangeSelection={true}
//           groupSelectsChildren={true}

//           onCellValueChanged={onCellValueChanged}


//           // Mantains columns order between renders.
//           maintainColumnOrder={true}


//         />
//           {/* <AgGridReact
//               rowData={students}
//               columnDefs={columnDefs}>
//           </AgGridReact> */}
//       </div>
//     </TabPanel>
//   )
// }


// // import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
// import { useEffect, useState } from "react";
// import { Student, fetchStudents } from "../api/fetch";
// import { TabPanel } from "@tremor/react";

// import 'react-data-grid/lib/styles.css';

// import DataGrid from 'react-data-grid';

// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'name', name: 'Nombre' },
//   { key: 'cardIdType', name: 'Tipo de documento' },
//   { key: 'cardIdNumber', name: 'Numero de documento' },
//   { key: 'session', name: 'Jornada' },
// ];


// export function StudentTab () {
//   const [students, setStudents] = useState<Student[]>([])

//   const rowKeyGetter = (row: Student) => {
//     return row.id;
//   }

//   // function rowKeyGetter(row: Student) {
//   //   return row.id;
//   // }

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       const studentData = await fetchStudents() ?? [];
//       setStudents(studentData);
//     };

//     fetchStudentData(); 
//   }, [])

//   return (
//     <TabPanel >
//       <DataGrid columns={columns} rows={students} rowKeyGetter={rowKeyGetter} onRowsChange={setStudents}
//         headerRowHeight={45}
      
//       />
//     </TabPanel>
//   )
// }




// -----------------------------------------

// // import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
// import { useEffect, useRef, useState } from "react";
// import { Student, fetchStudents } from "../api/fetch";

// import { HotTable } from '@handsontable/react';
// import { registerAllModules } from 'handsontable/registry';
// import 'handsontable/dist/handsontable.full.min.css';
// import { TabPanel } from "@tremor/react";
// // import type {  } from '@handsontable/react'
// import Handsontable from 'handsontable/base';
// import {
//   registerLanguageDictionary,
//   esMX,
// } from 'handsontable/i18n';



// registerAllModules()
// registerLanguageDictionary(esMX);

// export function StudentTab () {
//   const [students, setStudents] = useState<Student[]>([])
//   const hotTableRef = useRef<Handsontable | null>(null);

//   // const loadClickCallback = useRef<() => void | null>(() => {});
//   // const saveClickCallback = useRef<() => void | null>(() => {});

//   const loadClickCallback = () => {
//     console.log("cargar")
//   }

//   const saveClickCallback = () => {
//     console.log("guardar")
//   }


//   useEffect(() => {
//     // const hot = hotTableRef.current?.hotInstance

//     const fetchStudentData = async () => {
//       const studentData = await fetchStudents() ?? [];
//       setStudents(studentData);
//     };

//     // loadClickCallback.current = () => {
//     //   console.log("cargar")
//     // }

//     // saveClickCallback.current = () => {
//     //   console.log("guardar")
//     // }

//     fetchStudentData(); 
//   }, [])

//   return (
//     <TabPanel >
//       <div className="controls">
//         <button id="load" className="button button--primary button--blue" onClick={() => loadClickCallback()}>Load data</button>&nbsp;
//         <button id="save" className="button button--primary button--blue" onClick={() => saveClickCallback()}>Save data</button>
//       </div>


//       <HotTable
//         ref={hotTableRef}
//         data={students}
//         rowHeaders={true}
//         startRows={25}
//         columns={[
//           { data: 'id', title: "ID", readOnly: true },
//           { data: 'name', title: "Nombre"  },
//           { data: 'cardIdType', title: "Tipo de documento", type: 'dropdown', source: ['C.C.', 'T.I.'] },
//           { data: 'cardIdNumber', title: "Numero de documento"  },
//           { data: 'session', title: "Jornada"}
//         ]}
        
//         height="auto"
//         width="100%"
//         stretchH="all"
        
//         dropdownMenu={true}
//         hiddenColumns={{
//           indicators: true
//         }}
//         contextMenu={true}
//         multiColumnSorting={true}
//         filters={true}
//         customBorders={true}
//         manualRowMove={true}

//         afterChange={function(change, source) {
//           if (source === 'loadData') {
//             return; //don't save this change
//           }

//           console.log({change, source})
//         }}

//         className="customFilterButtonExample1"
//         licenseKey="non-commercial-and-evaluation"
//       />
//     </TabPanel>
//   )
// }