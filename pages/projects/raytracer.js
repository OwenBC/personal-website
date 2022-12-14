import {
  Container,
  Link,
  List,
  ListItem
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, ProjectImage, Meta } from '../../components/projects'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Project = () => (
  <Layout title="Inkdrop">
    <Container>
      <Title>
        Ray Tracer
      </Title>
      <P>
        A simple ray tracer program build as the final project of an intro 
        graphics course. Supports spheres, point lights and reflections!
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Source</Meta>
          <Link href="https://github.com/OwenBC/RayTracer">
            GitHub <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Tech</Meta>
          <span>C++</span>
        </ListItem>
      </List>

      <ProjectImage src="/images/projects/raytracer_sample.png" alt="Sample" />
      <ProjectImage src="/images/projects/raytracer_reflection.png" alt="Reflection" />
    </Container>
  </Layout>
)

export default Project