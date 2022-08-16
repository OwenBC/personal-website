import Head from 'next/head'
import Navbar from '../navbar'
import { useState } from 'react'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import ConwayCanvas from '../conway-canvas'
import ConwayMenu from '../conway-menu'

const Main = ({ children, router }) => {
  const [reset, setReset] = useState(false)

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/images/black_ram.svg" />
        <title>Owen Crewe - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Box right={0} left={0} top={0} bottom={0} position="fixed">
        <ConwayCanvas
          color1={useColorModeValue('#f0e7db', '#f7bc31')}
          color2={useColorModeValue('#9195fa', '#309fcf')}
          reset={reset}
          setReset={setReset}
        />
      </Box>

      <ConwayMenu
        position="fixed"
        bottom={5}
        left={5}
        setReset={() => {
          setReset(true)
        }}
      />

      <Container
        maxW="container.md"
        py={20}
        variant="content-body"
        borderRadius={5}
        position="relative"
        top="100px"
        style={{ backdropFilter: 'saturate(150%) blur(3px)' }}
        bg={useColorModeValue('#ffffff40', '#20202380')}
        // background="red"
      >
        {children}
      </Container>
    </Box>
  )
}

export default Main
