import { Box, Center } from '@chakra-ui/react'
import type { NextPage } from 'next'

import Background from '../common/components/Background'
import Navigation from '../common/components/Navigation'
import UserTable from '../common/components/UserTable'

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
