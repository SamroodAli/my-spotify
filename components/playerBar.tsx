import { Box, Flex, Text } from "@chakra-ui/layout";
import Player from "./player";
import { useSelector } from "../lib/store";

const PlayerBar = () => {
  const { activeSong, activeSongs } = useSelector((state) => state);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {activeSong && (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="small">{activeSong.artist.name}</Text>
          </Box>
        )}

        <Box width="40%">
          {activeSong && <Player songs={activeSongs} activeSong={activeSong} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
