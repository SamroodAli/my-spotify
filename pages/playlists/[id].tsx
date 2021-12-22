import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const PlaylistShow = ({ playlist }) => {
  return <div>{playlist.name}</div>;
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN!);
  const playlist = await prisma.playlist.findFirst({
    where: {
      id: Number(query.id),
      userId: id,
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
