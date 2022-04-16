import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import Background from './components/Background'
import Navigation from './components/Navigation'

type Props = {
    children: React.ReactNode
}

export default function Layout({children}: Props) {
  const [animationOn, setAnimationOn] = useState<boolean>(false);
  const toggleAnimation = () => setAnimationOn(!animationOn);
  return (
    <Box>
       <Navigation animationOn={animationOn} toggleAnimation={toggleAnimation}/>
       <Background animationOn={animationOn}/>
       <Box px={'5rem'} minH={'100vh'} py={'3rem'}>
         {children}
       </Box>
     </Box>
  )
}