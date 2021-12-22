import GradientLayout from "../components/gradientLayout";
import { NextPageContext } from "next";
import prisma from "../lib/prisma";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Artist } from "@prisma/client";
import { Image } from "@chakra-ui/react";

const Home = ({ artists }: { artists: Artist[] }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="gray"
      subtitle={"profile"}
      title="Scott Moss"
      roundImage
      description={`15 Public playlists`}
      image="https://dl.dropboxusercontent.com/s/8tyfzyb3b34ouxd/Openhttps://dl.dropboxusercontent.com/s/8tyfzyb3b34ouxd/Open"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl">Top artists this month</Text>
          <Text fontSize="sm">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px">
                <Image
                  src="http://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
