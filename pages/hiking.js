import { Container, Heading } from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'

const Hiking = () => {
  return (
    <Layout title="Hiking">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Hiking
        </Heading>
        <Paragraph>
          Under construction... Trip reports coming eventually, if I ever get
          around to it.
        </Paragraph>
      </Container>
    </Layout>
  )
}

export default Hiking
