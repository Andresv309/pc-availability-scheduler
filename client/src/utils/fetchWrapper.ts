
interface RequestOptions {
  url: string;
  method: string;
  body?: unknown;
}

export async function fetchData<T>({ url, method, body }: RequestOptions): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    };

    const response = await fetch(url, options);

    if (response.ok) {
      try {
        const data = await response.json()
        return data
      } catch (error) {
        console.log("Error parsing JSON:", error);
        return null;
      }
    } else {
      console.error("Fetch failed with status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}