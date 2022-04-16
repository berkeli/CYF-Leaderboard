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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AuthoredCollection } from '../../entities';
import { UserClass } from '../../entities/user';
import { spinnerJSX } from '../utils';
import config from '../config';
import UserInfo from './UserInfo';

interface UserTableState {
    users: UserClass[],
    pageNumber: number, 
    loading: boolean,
    hasMore: boolean,
    expanded: string,
    authCollections: AuthoredCollection[],
    total: number,
    forceSearch: boolean,
}
type Props = {
    query: string;
};

export default function UserTable({ query }:Props) {
    const bg = useColorModeValue('white', 'gray.800');
    const bgHover = useColorModeValue('gray.400', 'teal.400');

    const [state, setState] = useState<UserTableState>({
        users: [],
        authCollections: [],
        pageNumber: 0,
        loading: true,
        hasMore: false,
        expanded: '',
        total: 0,
        forceSearch: false
    });
    const observer = useRef<IntersectionObserver>()
    const lastItemRef = useCallback((node) => {
        if (state.loading) return
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => { 
          if (entries[0].isIntersecting && state.users.length < state.total) {
            setState({...state, pageNumber: state.pageNumber + 1})
          }
        })
    
        if (node) observer.current.observe(node) 
      }, [state.loading, state.users, state.total])

    const getUsers = async () => {
        axios({
            method: 'GET',
            url: `${config.APIURL}users`,
            params: {q: query, page: state.pageNumber, perPage: 10, clan: 'CodeYourFuture'},
        }).then((res)=>{
            setState({...state, users: [...state.users, ...res.data.data], loading: false, total: parseInt(res.headers.total)})
        }).catch((e) => {
            throw new Error('Something went wrong: ', e.message)
        })
    }

    useEffect(() => {
        setState({...state, pageNumber: 0, users: [], forceSearch: !state.forceSearch})
    } , [query])

    useEffect(()=>{
        setState({...state, loading: true});
        getUsers();
    }, [state.pageNumber, state.forceSearch])

    const toggleRow = (userID:string) => {
        const ID = userID === state.expanded ? '' : userID
        if (state.authCollections.length === 0) {
            axios({
                method: 'GET',
                url: `${config.APIURL}collections`
            }).then((res)=>{
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
                    {state.users.map((user, id)=> <UserRow forwardRef={id === state.users.length - 1 ? lastItemRef : null} key={id} id={id} user={user} expanded={state.expanded} toggleRow={toggleRow} authCollections={state.authCollections} bgHover={bgHover}/>)}
                </Tbody>
                
            </Table>
            { state.loading && spinnerJSX }
        </Box>
        );
}

interface IUserRow {
    user: UserClass;
    expanded: string;
    toggleRow: (id: string) => void;
    authCollections: AuthoredCollection[];
    bgHover: any;
    id: number;
    forwardRef: any
}

const UserRow: React.FC<IUserRow> = ({user, expanded, toggleRow, authCollections, bgHover, id, forwardRef} : IUserRow) => {
    const progress = Math.round(user.collectionProgress.reduce((tc : number,{completed}) => tc + completed, 0) / user.collectionProgress.reduce((tc,{total}) => tc + total, 0) * 10000)/100
    return(<>
        <Tr ref={forwardRef} key='0' cursor='pointer' role='group' onClick={() => toggleRow(user._id)}>
            <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}} w={'1'}>{id+1}</Td>
            <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}} >{user.name ? user.name : user.codewarsUsername}</Td>
            <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  display={{base: 'none', md: 'table-cell'}} isNumeric>{user.completedKatas.length}</Td>
            <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  display={{base: 'none', md: 'table-cell'}}>{user.ranks.overall.name}</Td>
            <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  isNumeric>{user.honor}</Td>
            <Td _groupHover={{background: bgHover}} _hover={{background: bgHover}}  isNumeric>{progress && `${progress}%`}</Td>
        </Tr>
        {user._id === expanded && <UserInfo user={user} collections={authCollections}/>}
    </>)
}
