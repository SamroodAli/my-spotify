import { Box, Flex, Text } from "@chakra-ui/layout";
import Player from "./player";
import { useSelector } from "../lib/store";

const PlayerBar = () => {
  const { activeSong, activeSongs } = useSelector((state) => state);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center" justify="center" height="100%">
        {activeSong && (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="small">{activeSong.artist.name}</Text>
          </Box>
        )}
        {!activeSong && (
          <Text color="white" fontSize="large">
            Select a song to play
          </Text>
        )}
        {activeSong && (
          <Box width="40%">
            <Player songs={activeSongs} activeSong={activeSong} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default PlayerBar;
