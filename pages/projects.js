import { Container, Heading } from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'

const Projects = () => {
  return (
    <Layout title="Projects">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Projects
        </Heading>
        <Paragraph>
          Under construction... 
        </Paragraph>
      </Container>
    </Layout>
  )
}

export default Projects
