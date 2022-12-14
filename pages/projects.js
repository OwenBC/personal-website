import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { TitledGridItem } from '../components/grid-item'

import raytracer_thumb from '../public/images/projects/raytracer_thumb.png'

const Projects = () => {
  return (
    <Layout title="Projects">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Projects
        </Heading>
        
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <TitledGridItem page="/projects/raytracer" title="Ray Tracer" thumbnail={raytracer_thumb}>
              A simple ray tracer program, supporting spheres, lights and reflections
            </TitledGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Projects
