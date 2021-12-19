import fetcher from "./fetcher";

interface credentials {
  email: string;
  password: string;
}

export const auth = (mode: "signin" | "signup", body: credentials) =>
  fetcher(`/${mode}`, body);
