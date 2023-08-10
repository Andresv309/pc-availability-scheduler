import { TabPanel, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

const data = [
  {
    id: 1,
    name: "Viola Amherd",
    brand: "Federal Councillor",
    processor: "The  (DDPS)",
    ram: "active",
    hasGraphicsCard: true
  },
  {
    id: 1,
    name: "Viola Amherd",
    brand: "Federal Councillor",
    processor: "The Federal Dep and Sport (DDPS)",
    ram: "active",
    hasGraphicsCard: true
  },
];

export function ComputerTab () {
  return (
    <TabPanel >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Marca</TableHeaderCell>
            <TableHeaderCell>Procesador</TableHeaderCell>
            <TableHeaderCell>Ram</TableHeaderCell>
            <TableHeaderCell>Tarjeta Gráfica</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.processor}</TableCell>
              <TableCell>{item.ram}</TableCell>
              <TableCell>{item.hasGraphicsCard}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabPanel>
  )
}