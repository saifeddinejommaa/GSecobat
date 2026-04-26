type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = {
  Code: number;
  Response: T;
  ResponseMessage: string;
};

export async function http<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const isGet = method.toUpperCase() === "GET";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: !isGet && body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "HTTP Error");
  }

  return response.json();
}