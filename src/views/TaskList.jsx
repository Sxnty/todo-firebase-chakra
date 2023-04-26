import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  GridItem,
  Center,
  Stack,
  Box,
  Flex,
  Text,
  Checkbox,
  Spacer,
} from '@chakra-ui/react';
const Main = styled.main`
  width: 100%;
  height: 100vh;
`;
function TaskList() {
  return (
    <>
      <Main>
        <Grid templateColumns='1fr 6fr'>
          <GridItem w='100%' h='100vh' p='8rem 0 0 3rem'>
            <Flex flexDirection={'column'} height={'100%'} width={'100%'}>
              <Box>
                <Stack spacing={'5'}>
                  <Flex gap={'.2rem'} align={'center'}>
                    <Box
                      bg='#D1E5F7'
                      w={'30px'}
                      h={'30px'}
                      borderRadius={'50%'}
                    />
                    <Text>Important</Text>
                  </Flex>
                  <Flex gap={'.2rem'} align={'center'}>
                    <Box
                      bg='#FFCECE'
                      w={'30px'}
                      h={'30px'}
                      borderRadius={'50%'}
                    />
                    <Text>Others</Text>
                  </Flex>
                  <Checkbox size='lg' colorScheme='blue' pt='2rem'>
                    <Text fontSize={'lg'} color={'#757267'}>
                      Hide done tasks
                    </Text>
                  </Checkbox>
                </Stack>
              </Box>
              <Spacer></Spacer>
              xD
            </Flex>
          </GridItem>
          <GridItem w='100%' h='10' bg='blue.200' />
        </Grid>
      </Main>
    </>
  );
}

export default TaskList;
