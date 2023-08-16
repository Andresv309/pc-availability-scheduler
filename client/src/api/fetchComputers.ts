import { Computer } from "../types/interfaces";
import { fetchData } from "../utils/fetchWrapper";
import { SERVER_ADDRESS } from "./env"

export async function getAllComputers(): Promise<Computer[] | null> {
  const url = `${SERVER_ADDRESS}/computers`;
  const method = 'GET';

  const computers = await fetchData<Computer[]>({url, method});
  return computers;
}

export async function editComputer({ id, computer }: { id: number; computer: Partial<Computer> }): Promise<Computer | null> {
  const url = `${SERVER_ADDRESS}/computer/${id}`;
  const method = 'PUT';

  const editedComputer = await fetchData<Computer>({url, method, body: computer});
  return editedComputer;
}

export async function insertComputer({ computer }: {computer?: Partial<Computer>} ): Promise<Computer | null> {
  const url = `${SERVER_ADDRESS}/computer`;
  const method = 'POST';
  const body = computer ?? {}

  const newComputer = await fetchData<Computer>({url, method, body});
  return newComputer;
}

export async function deleteComputer({ id }: { id: number }) {
  const url = `${SERVER_ADDRESS}/computer/${id}`;
  const method = 'DELETE';

  await fetchData({url, method});
}