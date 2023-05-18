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
import AsideSvg from '../components/AsideSvg/AsideSvg';
import Task from '../components/Task/Task';
import { getTasks } from '../firebase/firestore/firestoreApi';
import { useEffect, useContext } from 'react';
import { TasksContext } from '../states/TasksContext';

const Main = styled.main`
  width: 100%;
  height: 100vh;
`;

function TaskList() {
  const { tasks, setTasks } = useContext(TasksContext);
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch');
      const response = await getTasks();
      console.log(response);
      if (response.code === 200) {
        console.log(response.msg.length, 'tamaño cargado en memoria');
        setTasks(response.msg);
        localStorage.setItem('tasks', JSON.stringify(response.msg));
      }
    };

    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (!storedTasks || storedTasks.length === 0) {
      fetchData();
    } else {
      setTasks(storedTasks);
    }
  }, [setTasks]);
  return (
    <>
      <Main>
        <Grid templateColumns='1fr 6fr'>
          <GridItem w='100%' h='100vh' p='8rem 0 0 0'>
            <Flex flexDirection={'column'} height={'100%'} width={'100%'}>
              <Box pl={'3rem'}>
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
              <Box h={'100%'}>
                <AsideSvg />
              </Box>
            </Flex>
          </GridItem>
          <GridItem w='100%' h='100vh' p='2rem' pt={'8rem'}>
            <Grid
              templateColumns={'1fr 1fr 1fr 1fr'}
              gap={'1rem'}
              placeContent={'center'}
              alignContent={'center'}
            >
              {tasks && tasks.length > 0
                ? tasks.map(({ title, description, important, id, done }) => {
                  console.log(title, done)
                    return (
                      <Task
                        title={title}
                        description={description}
                        important={important}
                        id={id}
                        key={id}
                        done={done}
                      />
                    );
                  })
                : null}
            </Grid>
          </GridItem>
        </Grid>
      </Main>
    </>
  );
}

export default TaskList;
