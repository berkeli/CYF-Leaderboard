import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    useColorModeValue,
    Spinner,
    Center
} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserClass } from '../../entities';
import config from '../config';

export default function UserTable() {
    const bg = useColorModeValue('white', 'gray.800');
    const [users, setUsers] = useState<UserClass[]>([]);
    const [query, setQuery] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasmore] = useState<boolean>(false);
    const spinnerJSX = 
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
    useEffect(()=>{
        setLoading(true);
        let cancel:()=>void;
        axios({
            method: 'GET',
            url: `${config.APIURL}users`,
            params: {q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then((res)=>{
            setUsers( prevUsers => [...prevUsers, ...res.data.data])
            setLoading(false)
        }).catch((e) => {
            if (axios.isCancel(e)) return
        })
        return ()=> cancel()
    }, [query, pageNumber])
    console.log(users);
    return (
        <Box>
        <Table bg={bg} variant='striped'>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Katas Completed</Th>
                    <Th>Rank</Th>
                    <Th isNumeric>Honor</Th>
                    <Th isNumeric>Collections Progress</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((user, id)=>(
                   <Tr key={user._id}>
                       <Td>{id+1}</Td>
                       <Td>{user.name ? user.name : user.codewarsUsername}</Td>
                       <Td isNumeric>{user.completedKatas.length}</Td>
                       <Td>{user.ranks.overall.name}</Td>
                       <Td isNumeric>{user.honor}</Td>
                       <Td  isNumeric>{Math.round(user.collectionProgress.reduce((tc : number,{completed}) => tc + completed, 0) / user.collectionProgress.reduce((tc,{total}) => tc + total, 0) * 10000)/100 }%</Td>
                    </Tr> 
                ))}
            </Tbody>
            
        </Table>
        { loading ? spinnerJSX : null}
        </Box>
        );
}
