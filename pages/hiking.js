import { Container, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const Hiking = () => {
  return (
    <Layout title="Hiking">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Hiking
        </Heading>
      </Container>
    </Layout>
  )
}

export default Hiking
