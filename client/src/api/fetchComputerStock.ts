import { ComputerStock } from "../types/interfaces";
import { fetchData } from "../utils/fetchWrapper";
import { SERVER_ADDRESS } from "./env"

export async function getAllComputerStocks(): Promise<ComputerStock[] | null> {
  const url = `${SERVER_ADDRESS}/computer-stocks`;
  const method = 'GET';

  const ComputerStocks = await fetchData<ComputerStock[]>({url, method});
  return ComputerStocks;
}

export async function editComputerStock({ id, computerStock }: { id: number; computerStock: Partial<ComputerStock> }): Promise<ComputerStock | null> {
  const url = `${SERVER_ADDRESS}/computer-stock/${id}`;
  const method = 'PUT';

  const editedComputerStock = await fetchData<ComputerStock>({url, method, body: computerStock});
  return editedComputerStock;
}

export async function insertComputerStock({ computerStock }: {computerStock?: Partial<ComputerStock>} ): Promise<ComputerStock | null> {
  const url = `${SERVER_ADDRESS}/computer-stock`;
  const method = 'POST';
  const body = computerStock ?? {}

  const newComputerStock = await fetchData<ComputerStock>({url, method, body});
  return newComputerStock;
}

export async function deleteComputerStock({ id }: { id: number }) {
  const url = `${SERVER_ADDRESS}/computer-stock/${id}`;
  const method = 'DELETE';

  await fetchData({url, method});
}