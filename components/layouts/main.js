import Head from 'next/head'
// import dynamic from 'next/dynamic'
import Navbar from '../navbar'
import { useState } from 'react'
import { Box, Container, useColorModeValue, IconButton } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import ConwayCanvas from '../conway-canvas'
import Footer from '../footer'
// import ThreeDSceneLoader from '../3d-scene-loader'

// const LazyThreeDScene = dynamic(() => import('../3d-scene'), {
//   ssr: false,
//   loading: () => <ThreeDSceneLoader />
// })

const Main = ({ children, router }) => {
  const [reset, setReset] = useState(false)

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Owen Crewe - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Box right={0} left={0} top={0} bottom={0} position="fixed">
        <ConwayCanvas
          color={useColorModeValue('#9195fa', '#faf591')}
          reset={reset}
          setReset={setReset}
        />
      </Box>

      <IconButton
        position="fixed"
        bottom={5}
        left={5}
        aria-label="Reset game of life"
        colorScheme={useColorModeValue('blue', 'orange')}
        icon={<RepeatIcon />}
        onClick={() => {
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
      >
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
