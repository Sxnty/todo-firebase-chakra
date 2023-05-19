import React from 'react';
import { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { addTask } from '../firebase/firestore/firestoreApi';
import { TasksContext } from '../states/TasksContext';

const AddTask = ({ isOpen, onClose }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [error, setError] = useState(false);
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onSubmitHandler = async () => {
    if (!title || !description) {
      setError(true);
    } else {
      let newTask = { title, description, important: false, id: null };
      let result = await addTask(newTask);
      if (result.code === 200 && result) {
        newTask.id = result.id;
      }
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
  };

  const closeModal = () => {
    onClose();
    setError(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add task.</ModalHeader>
        <ModalBody>
          <Stack spacing={'1rem'}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input placeholder='Task title...' onChange={onTitleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='A short descrption of the task...'
                resize={'none'}
                size={'md'}
                onChange={onDescriptionChange}
              />
            </FormControl>
            <Button
              colorScheme='twitter'
              variant='outline'
              w={'100%'}
              onClick={onSubmitHandler}
            >
              Add
            </Button>
            {error ? (
              <ErrorMessage
                text={'You need to provide a title and description.'}
              />
            ) : null}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTask;
