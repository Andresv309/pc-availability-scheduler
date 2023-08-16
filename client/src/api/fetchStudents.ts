import { Student } from "../types/interfaces";
import { fetchData } from "../utils/fetchWrapper";
import { SERVER_ADDRESS } from "./env"


export async function getAllStudents(): Promise<Student[] | null> {
  const url = `${SERVER_ADDRESS}/students`;
  const method = 'GET';

  const students = await fetchData<Student[]>({url, method});
  return students;
}

export async function editStudent({ id, student }: { id: number; student: Partial<Student> }): Promise<Student | null> {
  const url = `${SERVER_ADDRESS}/student/${id}`;
  const method = 'PUT';

  const editedStudent = await fetchData<Student>({url, method, body: student});
  return editedStudent;
}

export async function insertStudent({ student }: {student?: Partial<Student>} ): Promise<Student | null> {
  const url = `${SERVER_ADDRESS}/student`;
  const method = 'POST';
  const body = student ?? {}

  const newStudent = await fetchData<Student>({url, method, body});
  return newStudent;
}

export async function deleteStudent({ id }: { id: number }) {
  const url = `${SERVER_ADDRESS}/student/${id}`;
  const method = 'DELETE';

  await fetchData({url, method});
}