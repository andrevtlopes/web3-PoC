import { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    Button,
    Skeleton,
    SkeletonText,
    Text,
} from '@chakra-ui/react';
import { useSendTransaction, useTransactions } from '@usedapp/core';
import { utils } from 'ethers';
import { useContractMethod } from '../common/hooks';
import prismaService from '../../services/prisma.service';

export default function Prismas() {
    const [disabled, setDisabled] = useState(false);
    const [prismas, setPrismas] = useState(undefined);
    const [sold, setSold] = useState(0);
    const [address, setAddress] = useState('');

    const { sendTransaction, state } = useSendTransaction();
    const { transactions } = useTransactions();

    useEffect(() => {
        prismaService
            .get()
            .then((res) => setPrismas(res.data.prismas))
            .catch(() => setDisabled(true));
    }, []);

    // const handleClick = () => {
    //     setDisabled(true);
    //     packService
    //         .getPrice()
    //         .then((res) => setAmount(res.data.price))
    //         .catch(() =>
    //             window.alert('Not able to retrieve pack price, try again!')
    //         );
    //     sendTransaction({
    //         to: process.env.NEXT_PUBLIC_TOKEN_WALLET,
    //         value: utils.parseEther(amount),
    //     });
    // };

    const prismaColor = (type: string) => {
        let color = 'gray';
        if (type === 'Nature') {
            color = 'green';
        } else if (type === 'Fire') {
            color = 'red';
        } else if (type === 'Water') {
            color = 'blue';
        }
        return color + '.400';
    };

    if (!prismas) return <></>;

    return (
        <Box w='100vw' gridGap='4' py='8' px='14' className='container grid grid-cols-12'>
            {prismas?.map((prisma) => (
                <Flex
                    direction='column'
                    alignItems='start'
                    gridGap='2'
                    bgColor='white'
                    borderRadius='30'
                    p='4'
                    className='col-span-12 sm:col-span-6 xl:col-span-3 lg:col-span-4'
                >
                    <Flex w='full' justifyContent='center'>
                        <Box
                            borderRadius='7'
                            border='1px'
                            borderColor={prismaColor(prisma?.famon?.type)}
                            px='5'
                            py='2'
                        >
                           # {typeof prisma?.id === 'number' ? prisma?.id : 'NO ID'}
                        </Box>
                    </Flex>
                    <Flex p='5' alignItems='center' justifyContent='center' pos='relative'>
                        <Flex pos='absolute' top='0' left='0' border='2px' borderColor='white' w='16' h='12' shadow='md' bg='purple.300' transform='auto' rotate='65' skewX='40' />
                        <Text pos='absolute' top='2' left='3.5' color='white' fontWeight='bold' w='full' alignSelf='center'>Rare</Text>
                        <Flex
                            h='28'
                            w='180px'
                            border='1px'
                            borderColor={prismaColor(prisma?.famon?.type)}
                            rounded='lg'
                            justifyContent='center'
                            alignItems='center'
                        > {prisma?.type} Famon Image :D
                            </Flex>
                    </Flex>
                    <Flex w='full' gridGap='2'>
                        <Box
                            align='center'
                            borderRadius='15'
                            bg={prismaColor(prisma?.famon?.type)}
                            py='3'
                            w='24'
                        >
                            <Text
                                fontSize='sm'
                                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                                Type
                            </Text>
                            <Text fontSize='md' color='white' fontWeight='bold'>
                                {prisma?.famon?.type ?? 'ERROR'}
                            </Text>
                        </Box>
                        <Box
                            flexGrow={1}
                            fontSize='sm'
                            borderRadius='15'
                            border='1px'
                            borderColor='gray.300'
                            px={4}
                            py={2}
                        >
                            <Text fontSize='sm' fontWeight='bold'>
                                Name
                            </Text>
                            <Text fontSize='xl' fontWeight='bold'>
                                {prisma?.famon?.type}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex
                        direction='column'
                        w='full'
                        gridGap='2'
                        borderRadius='15'
                        border='1px'
                        borderColor='gray.300'
                        px='4'
                        pb='2'
                    >
                        <Text
                            fontSize='sm'
                            borderRadius='15'
                            color='white'
                            py='1'
                            bg={prismaColor(prisma?.famon?.type)}
                            mx='-4'
                            textAlign='center'
                        >
                            Habilities
                        </Text>
                        <Text fontSize='sm'>- {prisma?.famon?.h1 ?? 'ERROR'}</Text>
                        <Text fontSize='sm'>- {prisma?.famon?.h2 ?? 'ERROR'}</Text>
                        <Text fontSize='sm'>- {prisma?.famon?.h3 ?? 'ERROR'}</Text>
                        <Text fontSize='sm'></Text>
                    </Flex>
                    {/* {transactions && transactions.map((transaction) => (
            <Flex
                bg='gray.600'
                color='white'
                key={transaction.transaction.hash}
            >
                <Box>{transaction.transaction}</Box>
                <Box>{transaction.transactionName}</Box>
                <Box>{transaction.submittedAt}</Box>
            </Flex>
        ))} */}
                </Flex>
            ))}
        </Box>
    );
}
