import React, {useContext} from 'react';
import {
  Grid,
  GridItem,
  Heading,
  Flex,
  Spacer,
  Text,
  Center,
  Box,
  Divider,
  Stack,
  Input,
  Highlight,
  Button,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import styled from 'styled-components';
import LoginSvg from '../components/LoginSvg/LoginSvg';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../states/AuthContext';

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: #d1e5f7;
`;

function Login() {
  const { loginWithGoogle, userLoged, userLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginWithGoogle();
    navigate("/");
  };

  if (userLoged) {
    return <Navigate to="/" />;
  }

  return (
    <Main>
      <Grid
        templateColumns='1fr 1fr'
        w={'90%'}
        h={'90vh'}
        margin={'auto auto'}
        bg={'whiteAlpha.900'}
        borderRadius={'3xl'}
      >
        <GridItem w='100%' h='100%' padding='1rem' borderRadius={'3xl'}>
          <Flex flexDirection='Column'>
            <Heading as='h1' size='xl'>
              Todo
            </Heading>
            <Spacer />
            <Center paddingTop={'10rem'}>
              <Box w={'40%'}>
                <Heading as='h2' size='lg'>
                  Login
                </Heading>
                <Stack spacing={'3rem'} paddingTop={'2rem'}>
                  <Input variant={'flushed'} placeholder='Email' required />
                  <Input variant={'flushed'} placeholder='Password' required />
                </Stack>
                <Text size={'xs'} mt={'1rem'} fontWeight={'bold'}>
                  Forgot your password?
                </Text>
                <Text fontSize='sm' pt='.5rem'>
                  <Highlight query='Register here.' styles={{ color: 'blue' }}>
                    Dont have an account? Register here.
                  </Highlight>
                </Text>
                <Button bg='#D1E5F7' w='100%' mt='2rem'>
                  Login
                </Button>
                <Box display={'flex'} alignItems={'center'} mt='1rem'>
                  <Box flex='1' borderBottom='1px solid #D1E5F7' mr='2' />
                  <Text>or</Text>
                  <Box flex='1' borderBottom='1px solid #D1E5F7' ml='2' />
                </Box>
                <Button
                  leftIcon={<FcGoogle />}
                  variant='outline'
                  w='100%'
                  mt='1rem'
                  onClick={handleLogin}
                >
                  Log in with Google.
                </Button>
              </Box>
            </Center>
          </Flex>
        </GridItem>
        <GridItem
          w='100%'
          h='100%'
          padding='1rem'
          bg={'#FFCECE'}
          borderTopRightRadius={'3xl'}
          borderBottomRightRadius={'3xl'}
        >
          <Flex
            w='100%'
            h='100%'
            justifyContent={'center'}
            alignItems={'center'}
          >
            <LoginSvg />
          </Flex>
        </GridItem>
      </Grid>
    </Main>
  );
}

export default Login;
