import fetcher from "./fetcher";

interface credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export function auth<Response>(mode: "signin" | "signup", body: credentials) {
  return fetcher<Response>(`/${mode}`, body);
}
