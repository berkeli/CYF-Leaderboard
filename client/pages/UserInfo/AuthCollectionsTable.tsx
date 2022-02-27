import { Table, Tbody, Td, Tfoot, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { AuthoredCollection } from '../../entities/authoredCollections';
import { collectionProgress } from '../../entities/user';
import dayjs from 'dayjs';

interface IAuthCollectionsTable {
    collectionProgress: collectionProgress[],
    collections: AuthoredCollection[]
}

export default function AuthCollectionsTable({ collectionProgress, collections } : IAuthCollectionsTable) {
    const collById:{[key:string] : any} = {};
    collectionProgress.forEach(e => {
        collById[e.id] = e
    })
    console.log(collById)
    const totalComplete = collectionProgress.reduce((a:number, cv:collectionProgress) => a + cv.completed, 0)
    const total = collections.reduce((a:number, cv:AuthoredCollection) => a + cv.katas.length, 0)
    return (
        <Table w='100%' size='sm' variant='simple'>
            <Thead>
                <Tr>
                    <Td>Collection Name</Td>
                    <Td>Completed/Total</Td>
                    <Td>Progress</Td>
                    <Td>Complete Date</Td>
                </Tr>
            </Thead>
            <Tbody>
                {collections.map(el => (
                    <Tr key={el._id}>
                        <Td>{el.name}</Td>
                        <Td>{collById[el._id].completed}/{el.katas.length}</Td>
                        <Td>{Math.round(collById[el._id].completed / el.katas.length * 10000) / 100}%</Td>
                        <Td>{collById[el._id].dateComplete ? dayjs(collById[el._id].dateComplete).format('DD MMM YYYY') : ''}</Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Td></Td>
                    <Td>{totalComplete}/{total}</Td>
                    <Td>{Math.round(totalComplete / total * 10000) / 100}%</Td>
                    <Td></Td>
                </Tr>
            </Tfoot>
        </Table>
    )
}
