import { Table, Tbody, Td, Tfoot, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

interface IAuthCollectionsTable {
    collectionProgress: object[],
    collections: object[]
}

export default function AuthCollectionsTable({ collectionProgress, collections } : IAuthCollectionsTable) {
    const collById:{[key:string] : any} = {};
    collections.forEach(e => {
        collById[e._id] = e
    })
    const totalComplete = collectionProgress.reduce((a:number, cv:object) => a + cv.completed,0)
    const total = collectionProgress.reduce((a:number, cv:object) => a + cv.total,0)
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
                {collectionProgress.map(el => (
                    <Tr key={el.id}>
                        <Td>{collById[el.id].name}</Td>
                        <Td>{el.completed}/{el.total}</Td>
                        <Td>{Math.round(el.completed / el.total * 10000) / 100}%</Td>
                        <Td></Td>
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
