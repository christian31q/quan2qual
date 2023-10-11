import { Box, Button, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex as="nav" p="10px" alignItems="center" gap="10px">
        <Heading as="h1">Opción de grado</Heading>
        <Spacer/>

        <HStack spacing="20px">
            <Box bg="gray.200" p="10px">M</Box>
            <Text>correo@gmail.com</Text>
            <Button colorScheme="purple">Cerrar Sesión</Button>  
        </HStack>
    </Flex>
    /*<Flex bg="gray.100" justify="space-between" wrap="wrap" gap="2">
        <Box w="150px" h="50px" bg="red">1</Box>
        <Box w="150px" h="50px" bg="blue">2</Box>
        <Box w="150px" h="50px" bg="green">3</Box>
        <Box w="150px" h="50px" bg="yellow">4</Box>
    </Flex>*/
  )
}
