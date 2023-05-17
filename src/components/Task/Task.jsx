import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Heading,
  Flex,
  Spacer,
  Divider,
  Box,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const Task = ({ title, description, important, id, done }) => {
  return (
    <Card w={'100%'} bg={'#FFF9DE'}>
      <CardHeader>
        <Flex align={'center'}>
          <Heading fontSize={'xl'}>{title}</Heading>
          <Spacer />
          <Menu>
            <MenuButton as={Button} bg={'#FFF9DE'}>
              <HiDotsHorizontal fontSize={'1.5rem'} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Text pr={'.5rem'}>Edit</Text>
                <AiFillEdit/>
              </MenuItem>
              <MenuItem>
              <Text pr={'.5rem'}>Delete</Text>
                <AiFillDelete />
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex w={'100%'}>
          <Box display={'flex'} gap={'1rem'}>
            <Box bg='#D1E5F7' w={'30px'} h={'30px'} borderRadius={'50%'} />
            <Box bg='#FFCECE' w={'30px'} h={'30px'} borderRadius={'50%'} />
          </Box>
          <Spacer />
          <Checkbox size='lg' colorScheme='blue'>
            Done
          </Checkbox>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Task;
