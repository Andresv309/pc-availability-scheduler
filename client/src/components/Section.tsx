import {
  TabList,
  Tab,
  TabGroup,
  TabPanels
} from "@tremor/react";

import { UserGroupIcon, UserPlusIcon, ComputerDesktopIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { ComputerTab } from "./ComputerTab";
import { StudentTab } from "./StudentTab";
import { AssignmentTab } from "./AssignmentTab";
import { StockTab } from "./StockTab";

export function Section () {
  return (
      <TabGroup className="mt-1">
        <TabList className="mt-2">
          <Tab icon={ComputerDesktopIcon}>Computadores</Tab>
          <Tab icon={UserGroupIcon}>Estudiantes</Tab>
          <Tab icon={ArchiveBoxIcon}>Inventario</Tab>
          <Tab icon={UserPlusIcon}>Assignación de Computador</Tab>
        </TabList>
        <TabPanels className="px-4 py-4">
          <ComputerTab />
          <StudentTab />
          <StockTab />
          <AssignmentTab />
        </TabPanels>
      </TabGroup>
  )
}