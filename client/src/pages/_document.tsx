
import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript} from 'next/document'
import theme from '../common/theme'

const Document = () => {
  return (
      <Html lang='en'>
        <Head title="CYF Leaderboard">
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript/>
        </body>
      </Html>
    )
}

export default Document