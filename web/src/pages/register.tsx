import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Register: React.FC<{}> = ({}) => {
  const [, register] = useRegisterMutation();
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
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='username'
                placeholder='Username'
                label='Username'
              />
              <Box mt={4}>
                <InputField name='email' placeholder='Email' label='Email' />
              </Box>
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
                  Register
                </Button>
                <Text mt={8} fontSize='smaller'>
                  Already have account? Go{' '}
                  <NextLink href='/login'>
                    <Link>here</Link>
                  </NextLink>
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

export default withUrqlClient(createUrqlClient)(Register);
