import { useToast } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { useEffect } from 'react';

const Index = () => {
  const toast = useToast();
  let isRead: boolean;
  if (process.browser) {
    isRead = localStorage.getItem('cookie-policy') === null ? false : true;
  }
  const toastLink = (
    <NextLink href='/privacy'>
      <Link>here</Link>
    </NextLink>
  );
  useEffect(() => {
    toast.closeAll(); // debug, nie dubluje sie
    if (!isRead) {
      toast({
        title: 'Cookies',
        position: 'bottom-right',
        description: `This site uses cookies. Read more at /privacy`,
        variant: 'subtle',
        duration: null,
        isClosable: true,
        onCloseComplete: () => localStorage.setItem('cookie-policy', '1'),
      });
    }
  }, []);
  return (
    <>
      <Navbar />
      <Wrapper>
        <div>hello viPortal</div>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
