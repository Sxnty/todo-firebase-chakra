import React from 'react';
import { Flex, Spacer, Heading } from '@chakra-ui/react';
import { RiAddFill } from 'react-icons/ri';
import { useState } from 'react';
import AddTask from '../../views/AddTask';
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Flex w={'100%'} alignItems={'center'} position={'absolute'}>
      <Heading p='1rem 3rem'>todo</Heading>
      <Spacer />
      <RiAddFill fontSize={'3rem'} p='1rem 3rem' onClick={onOpen} cursor={'pointer'}/>
      <AddTask isOpen={isOpen} onClose={onClose}/>
    </Flex>
  );
}

export default Header;
