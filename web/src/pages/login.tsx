import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Text, Link } from '@chakra-ui/react';
import Image from 'next/image';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant='small'>
      <Box
        d='flex'
        justifyContent='center'
        alignItems='center'
        flexDir='column'
        mt={16}
        mb={8}
      >
        <Image
          src='/images/worldwide.png'
          alt='Logo'
          width='180px'
          height='180px'
        />
        <Text fontSize='3xl'>viPortal</Text>
      </Box>
      <Box
        bg='gray.700'
        border='1px'
        borderColor='gray.700'
        p={4}
        borderRadius={20}
        m={2}
      >
        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='usernameOrEmail'
                placeholder='Username or Email'
                label='Username or Email'
              />
              <Box mt={4}>
                <InputField
                  name='password'
                  placeholder='Password'
                  label='Password'
                  type='password'
                />
              </Box>
              <Box
                d='flex'
                justifyContent='center'
                alignItems='center'
                flexDir='column'
              >
                <Button
                  isLoading={isSubmitting}
                  mt={8}
                  type='submit'
                  colorScheme='teal'
                >
                  Login
                </Button>
                <Text mt={8} fontSize='smaller'>
                  Don't have account? Go{' '}
                  <Link as={NextLink} href='/register'>
                    here
                  </Link>
                  .
                </Text>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
