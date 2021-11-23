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
import packService from '../../services/pack.service';

export default function BuyPacks() {
    const [disabled, setDisabled] = useState(false);
    const [amount, setAmount] = useState('');
    const [sold, setSold] = useState(0);
    const [address, setAddress] = useState('');

    const { sendTransaction, state } = useSendTransaction();
    const { transactions } = useTransactions();

    useEffect(() => {
        if (state.status != 'Mining') {
            packService
                .getPrice()
                .then((res) => setAmount(res.data.price))
                .catch(() => setDisabled(true));

            packService
                .getSold()
                .then((res) => setSold(res.data.count))
                .catch(() => setDisabled(true));
        }
    }, [state]);

    useEffect(() => {
        if (state.status != 'Mining') {
            setDisabled(false);
        } else if (state.status === 'Mining') {
            packService.postCreateTransaction(state.transaction.hash);
        }
    }, [state]);

    const handleClick = () => {
        setDisabled(true);
        packService
            .getPrice()
            .then((res) => setAmount(res.data.price))
            .catch(() =>
                window.alert('Not able to retrieve pack price, try again!')
            );
        sendTransaction({
            to: process.env.NEXT_PUBLIC_TOKEN_WALLET,
            value: utils.parseEther(amount),
        });
    };

    return (
        <Flex
            direction='column'
            alignItems='center'
            gridGap='2'
            bgColor='white'
            rounded='lg'
            p='2'
        >
            <Flex h='60' w='80' alignItems='center' justifyContent='center'>
                <Box
                    h='28'
                    w='24'
                    bgColor='gray.400'
                    className='animate-bounce'
                    rounded='full'
                />
            </Flex>
            <SkeletonText>
                Bla bla bla bla bla bla bla bla bla bla bla bla
            </SkeletonText>
            <Text fontSize='sm' bg='gray.300' rounded='full' px='3' py='0.5'>
                {sold} packs sold
            </Text>
            <Text fontSize='md'>{amount} BNB</Text>
            <Button
                w='fit-content'
                disabled={disabled}
                onClick={handleClick}
                colorScheme='pink'
            >
                Buy Starter Pack
            </Button>
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
    );
}
