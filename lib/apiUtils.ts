import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

export async function customFetch(
  endpoint: string,
  method: "PUT" | "POST" | "GET" | "DELETE" | "PATCH",
  body?: Object
) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(`../../api/${endpoint}`, {
      cache: "no-store",
      next: { revalidate: 0 },
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return await HTTP_RESPONSES[200](await response.json());
  } catch (error) {
    return HTTP_RESPONSES[500](error);
  }
}
