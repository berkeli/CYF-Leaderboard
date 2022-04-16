import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Link,
    Button,
    useColorModeValue,
    useColorMode,
    HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavLink = ({ children, url }: { children: ReactNode, url:string }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={url}
        target={url.includes('http') ? '_blank' : '_self'}>
        {children}
    </Link>
);

type Props = {
    animationOn: boolean,
    toggleAnimation: () => void,
}

export default function Navigation({animationOn, toggleAnimation}: Props) {
    const { colorMode, toggleColorMode } = useColorMode();
    const Links = [
        {title: 'Authored Collections', url: '/authored-collections'},
        {title: 'GitHub', url: 'https://github.com/berkeli/CYF-Leaderboard'},
    ]
    return <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                    <NavLink url='/'>CYF Leaderboard</NavLink>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink key={link.title} url={link.url}>{link.title}</NavLink>
                        ))}
                    </HStack>
                </HStack>
            <Box>
                <Button onClick={toggleAnimation} mr='4'>
                    {!animationOn ? 'Animations On' : 'Animations Off'}
                </Button>
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
            </Box>
            </Flex>            
        </Box>

    </>;
}
