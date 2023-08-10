import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

const data = [
  {
    id: 1,
    student: {
      name: "jdks",
      session: "da"
    },
    computerStock: {
      code: "sadj"
    }
  },
];

export function AssignmentTab () {
  return (
    <TabPanel >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre Estudiante</TableHeaderCell>
            <TableHeaderCell>Jornada</TableHeaderCell>
            <TableHeaderCell>Computador Asignado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.student.name}</TableCell>
              <TableCell>{item.student.session}</TableCell>
              <TableCell>{item.computerStock.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabPanel>
  )
}