import React, { useState, useContext } from 'react';
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
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { editTask } from '../../firebase/firestore/firestoreApi';
import { TasksContext } from '../../states/TasksContext';
const EditTaskModal = ({ isOpen, onClose, title, description, id }) => {
  let [titleValue, setTitleValue] = useState('');
  let [descriptionValue, setDescriptionValue] = useState('');
  let [error, setError] = useState(false);
  const { tasks, setTasks } = useContext(TasksContext);
  const onTitleChange = (e) => {
    setTitleValue(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const onSubmitHandler = async () => {
    if (!titleValue || !descriptionValue) {
      setError(true);
    } else {
      let updatedTask = {
        title: titleValue,
        description: descriptionValue,
      };
      const result = await editTask(id, updatedTask);
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskIndex = storedTasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        storedTasks[taskIndex] = { ...storedTasks[taskIndex], ...updatedTask };
        setTasks(storedTasks);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
      }
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {title} task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder={title} onChange={onTitleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder={description}
                resize={'none'}
                size={'md'}
                onChange={onDescriptionChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {error ? (
              <ErrorMessage
                text={'You need to provide a title and description.'}
              />
            ) : null}
            <Button colorScheme='green' mr={3} onClick={onSubmitHandler}>
              Update
            </Button>
            <Button
              variant={'outline'}
              onClick={() => {
                setError(false);
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTaskModal;
