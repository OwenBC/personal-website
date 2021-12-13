import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import ThreeDSceneLoader from '../3d-scene-loader'

const LazyThreeDScene = dynamic(() => import('../3d-scene'), {
  ssr: false,
  loading: () => <ThreeDSceneLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Owen Crewe - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <LazyThreeDScene />

      <Container
        maxW="container.md"
        py={20}
        variant="content-body"
        borderRadius={5}
        height={5000}
        position="relative"
        top="300px"
      >
        {children}
      </Container>
    </Box>
  )
}

export default Main
