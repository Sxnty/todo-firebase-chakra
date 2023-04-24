import React from 'react'
import { Flex, Spacer, Heading } from '@chakra-ui/react'
import { RiAddFill } from "react-icons/ri";

function Header() {
  return (
    <Flex w={'100%'} alignItems={'center'}>
        <Heading p='1rem'>todo</Heading>
        <Spacer/>
        <RiAddFill fontSize={'3rem'} p='1rem'/>
    </Flex>
  )
}

export default Header