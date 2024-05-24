import NextLink from 'next/link'
import { Container, Box, Heading, Image, Link, IconButton, Flex, Spacer } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import { EmailIcon } from '@chakra-ui/icons'

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
            About me
          </Heading>
          <Paragraph>
            Welcome to my website! I&#39;m a software engineering student at
            the University of Victoria in my final year of study.
            I&#39;m currently interning with AWS for the winter and 
            summer terms of 2023! I&#39;m looking to line up my final 
            co-op position this fall. 
            <br />
            <br />
            Check out my resume {''}
            <NextLink href="/resume.pdf" passHref>
              <Link target="_blank" rel="noopener noreferrer">
                here
              </Link>
            </NextLink>
            .
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
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Contact
          </Heading>
          <Box 
            display={{ md: 'flex' }}
            // background="red" 
          >
            <Flex>
              <NextLink href="https://github.com/OwenBC" passHref>
                <Link target="_blank" rel="noopener noreferrer">
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    size="lg"
                    icon={<IoLogoGithub size={42}/>} 
                  />
                </Link>
              </NextLink>
              <Spacer />
              <NextLink href="mailto:ocrewe04@gmail.com" passHref>
                <Link target="_blank" rel="noopener noreferrer">
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    size="lg"
                    icon={<EmailIcon boxSize={42} />} 
                  />
                </Link>
              </NextLink>
              <Spacer />
              <NextLink href="https://linkedin.com/in/ocrewe/" passHref>
                <Link target="_blank" rel="noopener noreferrer">
                  <IconButton
                    variant="ghost"
                    colorScheme="teal"
                    size="lg"
                    icon={<IoLogoLinkedin size={42} />} 
                  />
                </Link>
              </NextLink>
            </Flex>
          </Box>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
