import { Artist } from "@prisma/client";
import Gradientlayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
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

interface ArtistWithSongs extends Artist {
  songs: SongWithArtist[];
}

const ArtistShow = ({ artist }: { artist: ArtistWithSongs }) => {
  const color = getBgColor(artist.id);
  return (
    <Gradientlayout
      color={color}
      title={artist.name}
      subtitle="playlist"
      description={`${artist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${artist.id}`}
    >
      <SongsTable songs={artist.songs} />
    </Gradientlayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const artists = await prisma.artist.findUnique({
    where: {
      id: Number(query.id),
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
    props: { artists },
  };
};
export default ArtistShow;
