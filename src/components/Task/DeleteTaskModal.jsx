import React, { useContext } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';
import { deleteTask } from '../../firebase/firestore/firestoreApi';
import toast from 'react-hot-toast';
import { TasksContext } from '../../states/TasksContext';
const DeleteTaskModal = ({ isOpen, onClose, title, id }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const closeModal = () => {
    onClose();
  };

  const deleteConfirm = async () => {
    //firestore delete
    const toastId = toast.loading('Loading...');
    await deleteTask(id);
    if (deleteTask) {
      //local storage delete
      let storedTasks = JSON.parse(localStorage.getItem('tasks'));
      let deletedTask = storedTasks.findIndex((task) => task.id === id);
      storedTasks.splice(deletedTask, 1);
      setTasks(storedTasks);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
      toast.success('Task deleted!', {
        duration: 2000,
        id: toastId,
      });
    }
    await console.log(`Deleted ${title} with the id ${id}`);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete "{title}" task.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you absolutely certain you want to delete this task?{' '}
              <Text as={'span'} color='#ff504d'>
                This action is irreversible.
              </Text>
            </Text>
          </ModalBody>

          <ModalFooter gap={'1rem'}>
            <Button colorScheme='red' onClick={deleteConfirm}>
              Delete
            </Button>
            <Button variant='outline' mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteTaskModal;
