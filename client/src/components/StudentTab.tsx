// import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { useEffect, useRef, useState } from "react";
import { Student, fetchStudents } from "../api/fetch";

import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { TabPanel } from "@tremor/react";

// import {
//   drawCheckboxInRowHeaders,
//   addClassesToRows,
//   changeCheckboxCell,
//   alignHeaders
// } from "../hooks/tableHooks";

registerAllModules()

export function StudentTab () {
  const [students, setStudents] = useState<Student[]>([])
  const hotTableComponentRef = useRef(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentData = await fetchStudents() ?? [];
      setStudents(studentData);
    };

    fetchStudentData(); 
  }, [])

  return (



    <TabPanel >
      {/* <HotTable
        ref={hotTableComponentRef}
        data={students}
        rowHeaders={true}
        // colHeaders={[
        //   "No.",
        //   "Nombre",
        //   "Tipo de documento",
        //   "Numero de documento",
        //   "Jornada"
        // ]}
        columns={[
          { data: 'id', title: "ID", readOnly: true },
          { data: 'name', title: "Nombre"  },
          { data: 'cardIdType', title: "Tipo de documento", type: 'dropdown', source: ['C.C.', 'T.I.'] },
          { data: 'cardIdNumber', title: "Numero de documento"  },
          { data: 'session', title: "Jornada"}
        ]}
        
        height="auto"
        width="100%"
        stretchH="all"
        
        dropdownMenu={true}
        hiddenColumns={{
          indicators: true
        }}
        contextMenu={true}
        multiColumnSorting={true}
        filters={true}
        customBorders={true}
        manualRowMove={true}

        className="customFilterButtonExample1"
        licenseKey="non-commercial-and-evaluation"
      /> */}

<HotTable
      data={students}
      height={450}
      colWidths={[140, 126, 192, 100, 100]}
      colHeaders={[
        "No.",
        "Nombre",
        "Tipo de documento",
        "Numero de documento",
        "Jornada"
      ]}
      dropdownMenu={true}
      hiddenColumns={{
        indicators: true
      }}
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      // afterGetColHeader={alignHeaders}
      // beforeRenderer={addClassesToRows}
      // afterGetRowHeader={drawCheckboxInRowHeaders}
      // afterOnCellMouseDown={changeCheckboxCell}
      manualRowMove={true}
      licenseKey="non-commercial-and-evaluation"
    >
      <HotColumn data={1} />
      <HotColumn data={2} />
      <HotColumn data={3} />
      <HotColumn data={4} type="date" allowInvalid={false} />
      <HotColumn data={5} />
      <HotColumn data={6} type="checkbox" className="htCenter" />
      <HotColumn data={7} type="numeric" />
    </HotTable>



      {/* <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Tipo de documento</TableHeaderCell>
            <TableHeaderCell>Numero de documento</TableHeaderCell>
            <TableHeaderCell>Jornada</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.cardIdType}</TableCell>
              <TableCell>{student.cardIdNumber}</TableCell>
              <TableCell>{student.session}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
    </TabPanel>
  )
}