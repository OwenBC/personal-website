import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const LoadingSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const ThreeDSceneContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="space-scene"
    right={0}
    left={0}
    top={0}
    bottom={0}
    position="fixed"
    zIndex={-1}
  >
    {children}
  </Box>
))

const Loader = () => {
  return (
    <ThreeDSceneContainer>
      <LoadingSpinner />
    </ThreeDSceneContainer>
  )
}

export default Loader
