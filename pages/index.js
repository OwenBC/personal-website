import NextLink from 'next/link'
import { Container, Box, Heading, Image, Link } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'

const Page = () => {
  return (
    <Layout>
      <Container>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Owen Crewe
            </Heading>
            <p>Software Engineering Student @ UVic</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/owen.jpg"
              alt="Profile image"
            />
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            Welcome to my website! I&#39;m a software engineering student
            interested in all facets of the digital world. Lately, I&#39;ve been
            delving into web development and cybersecurity.
            <br />
            <br />
            Check out my resume {''}
            <NextLink href="/resume.pdf" passHref>
              <Link target="_blank" rel="noopener noreferrer">
                here
              </Link>
            </NextLink>
            , if you want.
          </Paragraph>
        </Section>
        {/* <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Hobbies
          </Heading>
          <Paragraph>
            Climbing,{' '}
            <NextLink href="/hiking">
              <Link>hiking</Link>
            </NextLink>
            ...
          </Paragraph>
        </Section> */}
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Contact
          </Heading>
          <Paragraph>
            Email: {''}
            <NextLink href="mailto:ocrewe04@gmail.com" passHref>
              <Link target="_blank" rel="noopener noreferrer">
                ocrewe04@gmail.com
              </Link>
            </NextLink>
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
