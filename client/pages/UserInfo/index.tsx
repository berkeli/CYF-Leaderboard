import { Box, Center, Heading, Table, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { UserClass } from "../../entities";
import AuthCollectionsTable from "./AuthCollectionsTable";

export default function UserInfo({user, collections} : {user:UserClass, collections:object[]}) {
  
  return (
    <Tr>
        <Td colSpan={100}>
            <Wrap w='100%' spacing='30px' justify='center'>
                <WrapItem w={{base: '100%', lg: '45%'}}>
                    <VStack w='100%'>
                        <Heading as='h3' size='md'>CodeYourFuture Authored Collections Progress:</Heading>
                        <AuthCollectionsTable collectionProgress = {user.collectionProgress} collections={collections}/>
                    </VStack>                    
                </WrapItem>
                <WrapItem w={{base: '100%', lg: '45%'}}>
                    <Center w='100%'>
                        <Heading as='h3' size='md'>Latest Katas:</Heading>
                    </Center> 
                </WrapItem>
            </Wrap>
        </Td>
    </Tr>
  )
}
