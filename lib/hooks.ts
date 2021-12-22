import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

interface UserMe extends User {
  playlistsCount: number;
}

export const useMe = () => {
  const { data, error } = useSWR<UserMe>("/me", fetcher);

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
