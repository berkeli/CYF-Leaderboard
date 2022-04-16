import { Table, Tbody, Td, Tfoot, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { AuthoredCollection } from '../../../entities/authoredCollections';
import { collectionProgress } from '../../../entities/user';
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
    const totalComplete = collectionProgress.reduce((a:number, cv:collectionProgress) => a + cv.completed, 0)
    const total = collections.reduce((a:number, cv:AuthoredCollection) => a + cv.katas.length, 0)
    return (
        <Table w='100%' size='sm' variant='simple'>
            <Thead>
                <Tr>
                    <Td w={{base: '40ch', lg: '25ch', xl:'35ch'}}>Collection</Td>
                    <Td>Completed</Td>
                    <Td>Progress</Td>
                    <Td style={{whiteSpace: 'nowrap'}}>Date</Td>
                </Tr>
            </Thead>
            <Tbody>
                {collections.map(el => (
                    <Tr key={el._id}>
                        <Td isTruncated noOfLines={1} w={{base: '40ch', lg: '25ch', xl:'35ch'}}>{el.name}</Td>
                        <Td>{collById[el._id]?.completed || 0}/{el.katas.length}</Td>
                        <Td>{collById[el._id]?.completed ? Math.round(collById[el._id]?.completed / el.katas.length * 10000) / 100 : 0}%</Td>
                        <Td style={{whiteSpace: 'nowrap'}}>{collById[el._id]?.dateComplete ? dayjs(collById[el._id].dateComplete).format('DD MMM YYYY') : ''}</Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Td>Overall</Td>
                    <Td>{totalComplete}/{total}</Td>
                    <Td>{Math.round(totalComplete / total * 10000) / 100}%</Td>
                    <Td></Td>
                </Tr>
            </Tfoot>
        </Table>
    )
}
