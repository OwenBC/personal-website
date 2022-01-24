import { Container, Heading } from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'

const Programming = () => {
  return (
    <Layout title="Programming">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Programming
        </Heading>
        <Paragraph>
          Under construction... Project writeups to come, probably.
        </Paragraph>
      </Container>
    </Layout>
  )
}

export default Programming
