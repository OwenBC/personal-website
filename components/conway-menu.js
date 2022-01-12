import NextLink from 'next/link'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
	IconButton,
	useColorModeValue,
	Box,
	Link
} from '@chakra-ui/react'
import { InfoIcon, RepeatIcon } from '@chakra-ui/icons'


const ConwayMenu = ({setReset, ...props}) => {
	return (
		<Popover placement='top-end' trigger='hover'>
			<PopoverTrigger>
				<IconButton
					icon={<InfoIcon />}
					size='sm'
					variant="outline"
					aria-label="Game of Life Menu"
					{...props}
				/>
			</PopoverTrigger>
			<PopoverContent bg={useColorModeValue('#f0e7db', '#202023')}>
				<PopoverHeader>
					Conway&apos;s Game of Life
				</PopoverHeader>
				<PopoverBody>
					The background of this page is a rendering of John Conway&apos;s Game of Life. It&apos;s a sequence of steps in which each cell either come alive or dies based on how many neighbors it has.
					<br /><br />
					<list>
						<ul>&bull; A live cell with fewer than 2 neighbors dies to underpopulation</ul>
						<ul>&bull; A live cell with fewer than 2 neighbors dies to overpopulation</ul>
						<ul>&bull; A live cell with 2 or 3 living neighbors survives</ul>
						<ul>&bull; A dead cell with 3 nieghbors comes to life</ul>
					</list>
					<br />
					Learn more{' '}
					<NextLink href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" passHref>
						<Link target="_blank" rel="noopener noreferrer">
							here
						</Link>
					</NextLink>.
				</PopoverBody>
				<PopoverFooter d='flex' justifyContent='space-between' alignItems='center'>
					<Box fontSize='sm'>
						Generate random initial condition
					</Box>
					<IconButton 
						aria-label="Reset game of life"
						colorScheme={useColorModeValue('blue', 'orange')}
						icon={<RepeatIcon />}
						onClick={setReset}
					/>
				</PopoverFooter>
			</PopoverContent>
		</Popover>
	)
}

export default ConwayMenu