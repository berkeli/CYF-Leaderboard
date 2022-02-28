/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AuthoredCollection } from '../../entities';
import { UserClass } from '../../entities/user';
import { spinnerJSX } from '../utils';
import config from '../config';
import UserInfo from './UserInfo';

interface UserTableState {
    users: UserClass[],
    query: string, 
    pageNumber: number, 
    loading: boolean,
    hasMore: boolean,
    expanded: string,
    authCollections: AuthoredCollection[]
}

export default function UserTable() {
    const bg = useColorModeValue('white', 'gray.800');
    const bgHover = useColorModeValue('gray.400', 'teal.400');

    const [state, setState] = useState<UserTableState>({
        users: [],
        authCollections: [],
        query: '',
        pageNumber: 0,
        loading: true,
        hasMore: false,
        expanded: '',
    });
    useEffect(()=>{
        setState({...state, loading: true});
        let cancel:()=>void;
        axios({
            method: 'GET',
            url: `${config.APIURL}users`,
            params: {q: state.query, page: state.pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then((res)=>{
            setState({...state, users: [...state.users, ...res.data.data], loading: false})
        }).catch((e) => {
            if (axios.isCancel(e)) return
        })
        return ()=> cancel()
    }, [state.query, state.pageNumber])

    const toggleRow = (userID:string) => {
        const ID = userID === state.expanded ? '' : userID
        if (state.authCollections.length === 0) {
            axios({
                method: 'GET',
                url: `${config.APIURL}collections`
            }).then((res)=>{
                console.log(res.data.data)
                setState({...state, authCollections: res.data.data, expanded: ID})
            }).catch((e) => {
                if (e) console.log(e.message);
            })
        } else {
            setState({...state, expanded: ID})
        }
    }
    console.log(state.users);
    return (
        <Box>
            <Table bg={bg} variant='striped'>
                <Thead>
                    <Tr>
                        <Th w={'1'}>#</Th>
                        <Th>Name</Th>
                        <Th display={{base: 'none', md: 'table-cell'}} isNumeric>Katas Completed</Th>
                        <Th display={{base: 'none', md: 'table-cell'}}>Rank</Th>
                        <Th isNumeric>Honor</Th>
                        <Th isNumeric>Progress</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {state.users.map((user, id)=>(
                            [<Tr key={user._id} cursor='pointer' role='group' onClick={() => toggleRow(user._id)}>
                                <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}} w={'1'}>{id+1}</Td>
                                <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}} >{user.name ? user.name : user.codewarsUsername}</Td>
                                <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  display={{base: 'none', md: 'table-cell'}} isNumeric>{user.completedKatas.length}</Td>
                                <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  display={{base: 'none', md: 'table-cell'}}>{user.ranks.overall.name}</Td>
                                <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  isNumeric>{user.honor}</Td>
                                <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  isNumeric>{Math.round(user.collectionProgress.reduce((tc : number,{completed}) => tc + completed, 0) / user.collectionProgress.reduce((tc,{total}) => tc + total, 0) * 10000)/100 }%</Td>
                            </Tr>,
                            user._id === state.expanded ? <UserInfo user={user} collections={state.authCollections}/> : null]
                            
                    ))}
                </Tbody>
                
            </Table>
            { state.loading ? spinnerJSX : null}
        </Box>
        );
}
