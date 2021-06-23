import { Box, Button, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Image from 'next/image';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
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
          initialValues={{ email: '' }}
          onSubmit={async (values) => {
            await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box
                d='flex'
                justifyContent='center'
                alignItems='center'
                flexDir='column'
              >
                We've sent you an email, check your inbox!
              </Box>
            ) : (
              <Form>
                <InputField
                  name='email'
                  placeholder='Email'
                  label='Email'
                  type='email'
                />
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
                    Send Reset Email
                  </Button>
                </Box>
              </Form>
            )
          }
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
