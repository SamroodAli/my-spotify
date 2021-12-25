import { Playlist, User } from "@prisma/client";
import Gradientlayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { SongWithArtist } from "../../lib/store";

const getBgColor = (id: number) => {
  const colors = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

interface PlaylistWithSongs extends Playlist {
  songs: SongWithArtist[];
}

const PlaylistShow = ({ playlist }: { playlist: PlaylistWithSongs }) => {
  const color = getBgColor(playlist.id);
  return (
    <Gradientlayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </Gradientlayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user: User;

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN!);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const playlist = await prisma.playlist.findFirst({
    where: {
      id: Number(query.id),
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};
export default PlaylistShow;
