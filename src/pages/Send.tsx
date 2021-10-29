
import { useEffect, useState } from 'react';
import { Flex, Input, Button, Box } from '@chakra-ui/react';
import { useTransactions } from '@usedapp/core';
import { utils } from 'ethers';
import { useContractMethod } from '@/common/hooks';

export default function Send() {
    const [disabled, setDisabled] = useState(false);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');


    const { state, send } = useContractMethod('transfer');
    const { transactions } = useTransactions();

    useEffect(() => {
        if (state.status != 'Mining') {
            setDisabled(false);
            setAmount('0');
            setAddress('');
            console.log(transactions);
        }
    }, [state]);

    const handleClick = () => {
        setDisabled(true)
        send(address, utils.parseEther(amount));
    }

    return <Flex direction='column' gridGap='2'>
        <Input
            disabled={disabled}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
            color='white'
        />
        <Input
            disabled={disabled}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Amount'
            color='white'
        />
        <Button
            disabled={disabled}
            onClick={handleClick}
            colorScheme='pink'
        >
            Send Prisma
        </Button>
        {/* {transactions.map((transaction) => (
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
}