import { Box, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'

import Background from './components/Background'
import Navigation from './components/Navigation'
import UserTable from './components/UserTable'

const Home: NextPage = () => {
   return (
     <Box>
       <Navigation/>
       <Background />
       <Box px={'5rem'} minH={'100vh'} pt={'3rem'}>
         <UserTable/>
       </Box>
       
     </Box>
  )
}

export default Home
