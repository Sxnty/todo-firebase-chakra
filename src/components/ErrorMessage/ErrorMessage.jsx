import { Text, Center } from '@chakra-ui/react';
import React from 'react';

const ErrorMessage = ({ text }) => {
  return (
    <>
      <Center>
        <Text color={'tomato'}>{text}</Text>
      </Center>
    </>
  );
};

export default ErrorMessage;
