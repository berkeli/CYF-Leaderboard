import { Center, Table, Tbody, Td, Tfoot, Thead, Tr } from '@chakra-ui/react'
import dayjs from 'dayjs';
import React from 'react'
import { completedKatas } from '../../entities/';
import { FaJava } from 'react-icons/fa';
import iconPicker from '../components/icons';

interface IAuthCollectionsTable {
    completedKatas: completedKatas[],
}

export default function UserKatasTable({ completedKatas } : IAuthCollectionsTable) {
    console.log(completedKatas)
    return (
        <Table w='100%' size='sm' variant='simple'>
            <Thead>
                <Tr>
                    <Td maxW='60ch'>Kata Name</Td>
                    <Td>Rank</Td>
                    <Td><Center>Languages</Center></Td>
                    <Td isNumeric>Complete Date</Td>
                </Tr>
            </Thead>
            <Tbody>
                {completedKatas.map(el => (
                    <Tr key={el.id._id}>
                        <Td isTruncated maxW={{base: '40ch', lg: '25ch', xl: '50ch'}}>{el.id.name}</Td>
                        <Td><span className=''>{el.id.rank.name}</span></Td>
                        <Td><Center>{el.completedLanguages.map(e => iconPicker(e))}</Center></Td>
                        <Td isNumeric minW='min-content'>{dayjs(el.completedAt).format('DD MMM YYYY')}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
