import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatDate, formatTime } from "../lib/formatters";
import { SongWithArtist, useActions } from "../lib/store";

const SongsTable = ({ songs }: { songs: SongWithArtist[] }) => {
  const { changeActiveSong, changeActiveSongs, playSong } = useActions(
    (actions) => actions
  );

  const handlePlay = (activeSong?: SongWithArtist) => {
    changeActiveSong(activeSong || songs[0]);
    changeActiveSongs(songs);
    playSong(true);
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            isRound
            size="lg"
            aria-label="play song"
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                onClick={() => handlePlay(song)}
                key={song.id}
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255,255,255,0.1)",
                  },
                }}
                cursor="pointer"
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
