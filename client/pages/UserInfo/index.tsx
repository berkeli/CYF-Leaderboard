import { Box, Center, Heading, Table, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { UserClass, AuthoredCollection } from "../../entities/";
import AuthCollectionsTable from "./AuthCollectionsTable";
import HistoricalChart from "./HistoricalChart";
import UserKatasTable from "./UserKatasTable";

export default function UserInfo({user, collections} : {user:UserClass, collections:AuthoredCollection[]}) {
  
  return (
    <Tr>
        <Td colSpan={100}>
            <Wrap w='100%' spacing='30px' justify='space-around'>
                <WrapItem w={{base: '100%', lg: '45%'}}>
                    <VStack w='100%'>
                        <Heading as='h3' size='md'>CodeYourFuture Authored Collections Progress:</Heading>
                        <AuthCollectionsTable collectionProgress = {user.collectionProgress} collections={collections}/>
                    </VStack>                    
                </WrapItem>
                <WrapItem w={{base: '100%', lg: '45%'}}>
                    <VStack w='100%'>
                        <Heading as='h3' size='md'>Latest Katas:</Heading>
                        <UserKatasTable completedKatas = {user.completedKatas.filter(e=> e.id).slice(0, collections.length + 1)} />
                    </VStack> 
                </WrapItem>
                <WrapItem w='100%'>
                    <VStack w='100%'>
                        <Heading as='h3' size='md'>Historical Information:</Heading>
                        <HistoricalChart data={user.weeklyProgress}></HistoricalChart>
                    </VStack> 
                </WrapItem>
            </Wrap>
        </Td>
    </Tr>
  )
}
