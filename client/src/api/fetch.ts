import { SERVER_ADDRESS } from "./env"

export interface Student {
  id:                 number;
  name:               string;
  cardIdType:         string;
  cardIdNumber:       string;
  session:            string;
  computerAssignment: null;
}


async function fetchStudents(): Promise<Student[] | null> {

  console.log(SERVER_ADDRESS)

  try {
    const response = await fetch(`${SERVER_ADDRESS}/students`);
    console.log(response)
    if (response.ok) {
      const students: Student[] = await response.json();
      return students;
    } else {
      console.error("Fetch failed with status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}



export { fetchStudents }