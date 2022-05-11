
import { useEffect, useState } from 'react';
import { Flex, Input, Button, Box } from '@chakra-ui/react';
import { utils } from 'ethers';
import { useWhitelistTokenContractFunction, useWhitelistTokenContractMethod } from '../common/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../app/reducers';

export default function TokenWhitelist() {
    const [disabled, setDisabled] = useState(false);
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState('');
    const user = useSelector((state: RootState) => state?.user);

    const { state, send } = useWhitelistTokenContractFunction('buyTokensWhitelist', user.signer);
    const getBalance = useWhitelistTokenContractMethod('getBalance');

    useEffect(() => {
        if (state.status != 'Mining') {
            setDisabled(false);
            setAmount('0');
        }
        
    }, [state]);

    useEffect(() => {
        if (getBalance) {
            setBalance(getBalance[0])
        }
    },[getBalance])

    const handleClick = () => {
        setDisabled(true);
        const overrides = {
            value: utils.parseEther(amount),
        }

        const v = 0x1c;
        const r = '0xe5a56d7030c88897c65ec614eb860614ed11cc0950e1537da4c727a9da06beb6';
        const s = '0x2ac779d988c3dde87b36600a4c7bf5019ece43abd045ed65a801e238b3ea42f2';
        send(v, r, s, overrides);
    }

    return <Flex direction='column' gridGap='2'>
        <Box color='white'>Balance: {balance && utils.formatEther(balance) + ' BNB'}</Box>
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