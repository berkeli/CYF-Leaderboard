import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react';

export default function Background() {
  const color = useColorModeValue('var(--chakra-colors-gray-800)','var(--chakra-colors-gray-200)');
  const shColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')
  const style = { WebkitTextStroke : `2px ${color}` };
  const cursorSpeed = [0.5, 0.25, 2.25, 1.75, 0.25, 2.25, 0.25, 1.75, 0.25, 1.5]
  const textBox = Array.from(Array(10).keys()).map((i) => {      
      const row = Array.from(Array(10).keys()).map((j) => <span key={(i + 1) * j} style={ j % 2 === 0 ? {} : style}>CodeYourFuture</span>)
      const setVar = {'--i' : cursorSpeed[i], '--shadow-color' : shColor} as React.CSSProperties;
      return (<h2 key={i} style={setVar}>{row}</h2>)
  })

  return (
    <Box className="animatedBackground">
      <div className='animatedText'>
        {textBox}
      </div>      
    </Box>);
}
