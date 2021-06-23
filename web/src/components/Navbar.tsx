import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let menuIcon = null;
  let menuItems = null;
  let displayUser = null;

  if (fetching) {
    // fetching
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
        <MenuItem
          isDisabled={logoutFetching}
          onClick={() => {
            logout();
            router.reload();
          }}
        >
          Logout
        </MenuItem>
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
      borderBottom='1px'
      borderBottomColor='gray.700'
    >
      <HStack>
        <Image
          src='/images/worldwide.png'
          alt='Logo'
          width='40px'
          height='40px'
        />
        <Box ml={4}>viPortal</Box>
      </HStack>
      <Box>
        <HStack>
          {displayUser && <Box>Welcome, {displayUser}!</Box>}
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
