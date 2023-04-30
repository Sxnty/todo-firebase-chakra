import React from 'react';
import { useState } from 'react';
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


const AddTask = ({ isOpen, onClose }) => {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [error, setError] = useState(false)
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const onSubmitHandler = () => {
    if(!title || !description) {
      setError(true)
    }
  }
  const closeModal = () => {
    onClose()
    setError(false)
  }

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
            <Button colorScheme='twitter' variant='outline' w={'100%'} onClick={onSubmitHandler}>
              Add
            </Button>
          {error ? <ErrorMessage text={'You need to provide a title and description.'}/> : null}
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
