import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

const data = [
  {
    id: 1,
    code: "Viola Amherd",
    location: "Federal Councillor",
    state: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    computer: {
      name: "sa"
    }
  },

];

export function StockTab () {
  return (
    <TabPanel >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Computador</TableHeaderCell>
            <TableHeaderCell>Código</TableHeaderCell>
            <TableHeaderCell>Ubicación</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.computer.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabPanel>
  )
}