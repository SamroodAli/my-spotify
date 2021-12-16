import NextLink from "next/link";

import {
  Box,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";

const SideBarLinks = ({ links }) =>
  links.map((menu) => (
    <Box>
      <List spacing={2}>
        <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
          <LinkBox>
            <NextLink href={menu.route} passHref>
              <LinkOverlay>
                <ListIcon as={menu.icon} color="white" marginRight="20px" />
                {menu.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      </List>
    </Box>
  ));

export default SideBarLinks;
