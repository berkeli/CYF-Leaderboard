import { Box } from '@chakra-ui/react'
import React from 'react'
import Background from './components/Background'
import Navigation from './components/Navigation'

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <Box>
       <Navigation/>
       <Background />
       <Box px={'5rem'} minH={'100vh'} pt={'3rem'}>
         {children}
       </Box>
     </Box>
  )
}