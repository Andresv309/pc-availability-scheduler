import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

const data = [
  {
    id: 1,
    name: "Viola Amherd",
    cardIdType: "Federal Councillor",
    cardIdNumber: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    session: "active",
  },
  {
    id: 1,
    name: "Viola Amherd",
    cardIdType: "Federal Councillor",
    cardIdNumber: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    session: "active",
  },
];

export function StudentTab () {
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
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.cardIdType}</TableCell>
              <TableCell>{item.cardIdNumber}</TableCell>
              <TableCell>{item.session}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabPanel>
  )
}