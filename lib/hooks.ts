import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR<User>("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[]>("/playlists", fetcher);
  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
