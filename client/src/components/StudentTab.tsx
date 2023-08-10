import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { useEffect, useState } from "react";
import { Student, fetchStudents } from "../api/fetch";


export function StudentTab () {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentData = await fetchStudents() ?? [];
      setStudents(studentData);
    };

    fetchStudentData(); 
  }, [])

  return (
    <TabPanel >
      <Table>
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
      </Table>
    </TabPanel>
  )
}