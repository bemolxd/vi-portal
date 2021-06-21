import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import NextLink from 'next/link';

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
        <MenuItem>
          <NextLink href='/login'>Login</NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href='/register'>Register</NextLink>
        </MenuItem>
      </>
    );
  } else {
    menuIcon = <AiOutlineUser />;
    displayUser = data.me.username;
    menuItems = (
      <MenuItem>
        <NextLink href='/login'>Login</NextLink>
      </MenuItem>
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
      <Box>viPortal</Box>
      <Box>
        <Box mr={4}>{displayUser}</Box>
        <Menu>
          <MenuButton as={IconButton} icon={menuIcon} />
          <MenuList bg='white'>{menuItems}</MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
