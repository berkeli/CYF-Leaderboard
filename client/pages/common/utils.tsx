import { Center, Spinner } from "@chakra-ui/react";

export const spinnerJSX = 
<Center minH={'100%'} minW={'100%'}>
    <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='red.500'
        size='xl'
        mx='auto'
    />
</Center>