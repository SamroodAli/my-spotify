export default async function fetcher<Response>(
  url: string,
  data = undefined
): Promise<Response> {
  // data is undefined by default becase JSON.stringify(undefined) is undefined whereas JSON.stringify(null) returns a string 'null'
  const response = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include", // for jwt cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = (await response.json()) as Response;
  return json;
}
