export default function fetcher(url: string, data = undefined) {
  // data is undefined by default becase JSON.stringify(undefined) is undefined whereas JSON.stringify(null) returns a string 'null'
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include", // for jwt cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
