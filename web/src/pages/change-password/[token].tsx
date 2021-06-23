import { Box, Button, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { NextComponentType, withUrqlClient } from 'next-urql';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenErr, setTokenErr] = useState('');
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
          initialValues={{ newPassword: '' }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              token,
            });
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if ('token' in errorMap) {
                setTokenErr(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name='newPassword'
                placeholder='New Password'
                label='New Password'
                type='password'
              />
              <Box
                d='flex'
                justifyContent='center'
                alignItems='center'
                flexDir='column'
              >
                {tokenErr && <Text color='red'>{tokenErr}</Text>}
                <Button
                  isLoading={isSubmitting}
                  mt={8}
                  type='submit'
                  colorScheme='teal'
                >
                  Change Password
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(
  ChangePassword as NextComponentType
);
