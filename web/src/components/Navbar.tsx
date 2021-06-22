import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import NextLink from 'next/link';
import LogoImg from '../images/worldwide.png';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let menuIcon = null;
  let menuItems = null;
  let displayUser = null;

  if (fetching) {
  } else if (!data?.me) {
    menuIcon = <AiOutlineLock />;
    menuItems = (
      <>
        <NextLink href='/login'>
          <MenuItem>Login</MenuItem>
        </NextLink>
        <NextLink href='/register'>
          <MenuItem>Register</MenuItem>
        </NextLink>
      </>
    );
  } else {
    menuIcon = <AiOutlineUser />;
    displayUser = data.me.username;
    menuItems = (
      <>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Logout</MenuItem>
      </>
    );
  }

  return (
    <Box
      d='flex'
      justifyContent='space-between'
      placeItems='center'
      h='64px'
      boxShadow='md'
      px={8}
    >
      <HStack>
        <Image
          h='30px'
          src='https://image.flaticon.com/icons/png/512/785/785824.png'
        />
        <Box ml={4}>viPortal</Box>
      </HStack>
      <Box>
        <HStack>
          <Box>Witaj, {displayUser}!</Box>
          <Menu>
            <MenuButton as={IconButton} icon={menuIcon} borderRadius='full' />
            <MenuList>
              {menuItems}
              <MenuDivider />
              <MenuItem>About</MenuItem>
              <MenuItem>Privacy</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </Box>
  );
};
