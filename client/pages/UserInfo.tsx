import { Box, Center, Heading, Table, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { UserClass } from "../entities";

export default function UserInfo({user, collections} : {user:UserClass, collections:object[]}) {
  const collById:{[key:string] : any} = {};
  collections.forEach(e=> {
    collById[e._id] = e
  })
  const totalComplete = user.collectionProgress.reduce((a,cv) => a + cv.completed,0)
  const total = user.collectionProgress.reduce((a,cv) => a + cv.total,0)
  return (
    <Tr>
        <Td colSpan={100}>
            <Wrap w='100%' spacing='30px' justify='center'>
                <WrapItem w={{base: '100%', lg: '45%'}}>
                    <VStack w='100%'>
                        <Heading as='h3' size='md'>CodeYourFuture Authored Collections Progress:</Heading>
                        <Table w='100%' size='sm' variant='striped'>
                            <Thead>
                                <Tr>
                                    <Td>Collection Name</Td>
                                    <Td>Completed/Total</Td>
                                    <Td>Progress</Td>
                                    <Td>Complete Date</Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user.collectionProgress.map(el => (
                                    <Tr key={el.id}>
                                        <Td>{collById[el.id].name}</Td>
                                        <Td>{el.completed}/{el.total}</Td>
                                        <Td>{Math.round(el.completed/el.total*10000)/100}%</Td>
                                        <Td></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Td></Td>
                                    <Td>{totalComplete}/{total}</Td>
                                    <Td>{Math.round(totalComplete/total*10000)/100}%</Td>
                                    <Td></Td>
                                </Tr>
                            </Tfoot>
                        </Table>
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
