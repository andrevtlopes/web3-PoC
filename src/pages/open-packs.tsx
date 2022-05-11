import { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    Button,
    SkeletonText,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper
} from '@chakra-ui/react';
import { useContractFunction, useSendTransaction, useTransactions, useEthers, useContractCall, useContractCalls } from '@usedapp/core';
import { utils, Contract } from 'ethers';
import { useContractMethod } from '../common/hooks';
import packService from '../../services/pack.service';
import Spinner from '../common/components/Spinner';
import BuyPack from '../../artifacts/contracts/BuyFamon.sol/BuyFamon.json';
import authService from '../../services/auth.service';
import { useSelector } from 'react-redux';
import { RootState } from '../app/reducers';

export default function BuyPacks() {
    const [disabled, setDisabled] = useState(false);
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [counter, setCounter] = useState(0);
    const [limit, setLimit] = useState(0);
    const [sold, setSold] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const user = useSelector((state: RootState) => state?.user);

    // const { sendTransaction, state } = useSendTransaction();
    const { transactions } = useTransactions();
    
    const buyPackInterface = new utils.Interface(BuyPack.abi);

    const buyPackContract = new Contract("0xa4339ef904789B8fC389D40c945A971cbBdCD2f4", buyPackInterface, user.signer);

    const { state, send } = useContractFunction(buyPackContract, 'buyFamon', { transactionName: 'Buy Pack' });

    console.log(state)
    const call = useContractCalls([
        {
            abi: buyPackInterface,
            address: "0xa4339ef904789B8fC389D40c945A971cbBdCD2f4",
            method: 'min',
            args: [],
        },
        {
            abi: buyPackInterface,
            address: "0xa4339ef904789B8fC389D40c945A971cbBdCD2f4",
            method: 'max',
            args: [],
        },
        {
            abi: buyPackInterface,
            address: "0xa4339ef904789B8fC389D40c945A971cbBdCD2f4",
            method: 'price',
            args: [],
        },
        {
            abi: buyPackInterface,
            address: "0xa4339ef904789B8fC389D40c945A971cbBdCD2f4",
            method: 'getCounterAndLimit',
            args: [],
        }
    ]);

    console.log(call)
    useEffect(() => {
        if (call[0] !== undefined) {
            setMin(call[0][0]);
            setMax(call[1][0]);
            setPrice(utils.formatEther(call[2][0]));
            setCounter(utils.formatUnits(call[3][0], 'wei'));
            setLimit(utils.formatUnits(call[3][1], 'wei'));
        }
    }, [call]);

    useEffect(() => {
        if (price !== '' && amount === 0) {
            setAmount(parseFloat(price));
        }
    }, [price]);

    useEffect(() => {
        if (state.status != 'Mining') {
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
            packService.postCreateTransaction(state.transaction.hash, quantity);
        }
    }, [state]);

    const buyPacks = (etherAmount: string, quantity: number) => {
        const overrides = {
            value: utils.parseEther(etherAmount),
        }
        send(quantity, overrides)
    }

    const handleClick = async () => {
        if (user.signer !== null) {
            setDisabled(true);
            buyPacks(amount.toString(), quantity);
        }
    };

    const onChangeQuantity = (value) => {
        let q = parseInt(value);
        if (q > max) {
            q = max
        }
        else if (q < min) {
            q = min;
        }
        setQuantity(q);
        setAmount(parseFloat(price) * q);
    }

    return (
        <Flex
            direction='column'
            alignItems='center'
            gridGap='2'
            bgColor='white'
            rounded='lg'
            p='2'
        >
            <Spinner isOpen={openModal} />
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
                {counter}/{limit} packs sold
            </Text>
            <Text fontSize='md'>{amount} BNB</Text>
            <NumberInput defaultValue={1} min={min} max={max} onChange={onChangeQuantity}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
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
