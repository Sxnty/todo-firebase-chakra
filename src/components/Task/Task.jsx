import React, { useState } from 'react';
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
import { updateStatus } from '../../firebase/firestore/firestoreApi';
import toast, { Toaster } from 'react-hot-toast';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

const Task = ({ title, description, important, id, done }) => {
  const [isDone, setIsDone] = useState(done);

  const [modalData, setModalData] = useState({
    deleteModalOpen: false,
    editModalOpen: false,
  });

  const openModal = (modalName) => {
    setModalData((prevData) => ({
      ...prevData,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName) => {
    setModalData((prevData) => ({
      ...prevData,
      [modalName]: false,
    }));
  };

  const handleCheckboxChange = async (e) => {
    const toastId = toast.loading('Loading...');
    const isChecked = e.target.checked;
    setIsDone(isChecked);
    await updateStatus(id, isChecked);
    if (updateStatus) {
      toast.success('Task updated!', {
        duration: 2000,
        id: toastId,
      });
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = storedTasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: isChecked };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <Card w={'100%'} bg={!isDone ? '#FFF9DE' : '#fff9de21'}>
      <CardHeader>
        <Flex align={'center'}>
          {!isDone ? (
            <>
              <Heading fontSize={'xl'}>{title}</Heading>
            </>
          ) : (
            <Heading as='del' fontSize={'xl'}>
              {title}
            </Heading>
          )}
          <Spacer />
          <Menu>
            <MenuButton as={Button} bg={'transparent'}>
              <HiDotsHorizontal fontSize={'1.5rem'} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => openModal('editModalOpen')}>
                <Text pr={'.5rem'}>Edit</Text>
                <AiFillEdit />
                <EditTaskModal
                  isOpen={modalData.editModalOpen}
                  onClose={() => closeModal('editModalOpen')}
                  title={title}
                  description={description}
                  id={id}
                />
              </MenuItem>
              <MenuItem onClick={() => openModal('deleteModalOpen')}>
                <Text pr={'.5rem'}>Delete</Text>
                <AiFillDelete />
              </MenuItem>
              <DeleteTaskModal
                isOpen={modalData.deleteModalOpen}
                onClose={() => closeModal('deleteModalOpen')}
                title={title}
                id={id}
              />
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
          <Checkbox
            size='lg'
            colorScheme='blue'
            /*             onChange={(e) => {
              if (e.target.checked) {
                done = true;
                console.log(done);
              }
            }} */
            isChecked={isDone}
            onChange={handleCheckboxChange}
          >
            Done
          </Checkbox>
        </Flex>
      </CardFooter>
      <Toaster />
    </Card>
  );
};

export default Task;
