import NextImage from "next/image";
import NextLink from "next/link";

import {
  Box,
  List,
  ListItem,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";

import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

import SideBarLinks from "./sideBarLinks";
import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box height="45%">
          <Box width="120px" marginBottom="20px" paddingX="20px">
            <NextImage src="/logo.svg" height={60} width={120} />
          </Box>
          <Box marginBottom="20px">
            <SideBarLinks links={navMenu} />
          </Box>
          <Box marginTop="20px">
            <SideBarLinks links={musicMenu} />
          </Box>
        </Box>
        <Divider color="gray.800" />
        <Box
          height="55%"
          overflowY="hidden"
          _hover={{ overflowY: "auto" }}
          paddingY="20px"
        >
          <List spaceing={2}>
            {Array.isArray(playlists) &&
              playlists.map((playlist) => (
                <ListItem paddingX="20px" key={playlist.id}>
                  <LinkBox>
                    <NextLink
                      href={{
                        pathname: "/playlists/[id]",
                        query: { id: playlist.id },
                      }}
                      passHref
                    >
                      <LinkOverlay>{playlist.name}</LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
