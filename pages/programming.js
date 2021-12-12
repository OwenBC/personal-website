import { Container, Heading } from "@chakra-ui/react";
import Layout from "../components/layouts/article";

const Programming = () => {
  return (
    <Layout title="Programming">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Programming
      </Heading>
    </Container>
    </Layout>
  )
}

export default Programming