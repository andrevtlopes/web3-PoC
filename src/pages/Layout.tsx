// Layout.tsx
import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';

type Props = {
    children?: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            bg='gray.800'
            mt='14'
            pb='12'
            sx={{ minHeight: 'calc(100vh - 3.5rem)' }}
        >
            <Navbar />
            {children}
            <footer className='absolute bottom-0 flex justify-center w-full h-12 font-bold text-gray-200 align-middle'>Copyright © 2021 Fevian</footer>
        </Flex>
    );
}
