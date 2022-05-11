import {
    Flex,
    Text,
    Button,
    SkeletonText,
    SkeletonCircle,
} from '@chakra-ui/react';
import {
    useEthers,
    useEtherBalance,
    shortenIfAddress,
} from '@usedapp/core';
import { utils } from 'ethers';
import BNBCoin from '../assets/bnblogo.svg';
import Identicon from './Identicon';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '@/app/actions';
import { RootState } from '@/app/reducers';
import { useEffect, useState } from 'react';
import { loginCheckAction, fetchBalanceAction } from '../app/actions';

type Props = {
    handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
    const { activateBrowserWallet, account, library } = useEthers();
    const user = useSelector((state: RootState) => state?.user);
    const [loading, setLoading] = useState(true);
    const [tryLogin, setTryLogin] = useState(false);
    const etherBalance = useEtherBalance(user?.publicAddress);
    const dispatch = useDispatch();

    const handleConnectWallet = async () => {
        try {
            activateBrowserWallet();
            setTryLogin(true);
            if (account !== null) {
                login();
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(account)
        if (library) {
            const signer = library.getSigner(account);
            let timer1 = setTimeout(() => setLoading(false), 1000);
            dispatch(loginCheckAction({ signer }));
            dispatch(fetchBalanceAction());
        
            return () => {
                clearTimeout(timer1);
            };
        }
    }, []);

    const login = () => {
        const signer = library.getSigner(account);
        dispatch(loginRequestAction({ publicAddress: account, signer }));
        setTryLogin(false);
    }

    useEffect(() => {
        if (tryLogin) {
            login();
        }
    }, [account]);

    return loading || user?.token ? (
        <Flex
            background='gray.600'
            m='2'
            pl='3'
            borderRadius='xl'
            alignItems='center'
            gridGap='2'
        >
            <Text color='white' fontSize='md'>
                TTK:
            </Text>
            <SkeletonText
                noOfLines={1}
                spacing='5'
                skeletonHeight='4'
                isLoaded={!!user?.tokenBalance}
            >
                <Text color='white' fontSize='md'>
                    {(user?.tokenBalance &&
                        parseFloat(utils.formatEther(user?.tokenBalance)).toFixed(4)) ||
                        '00.0000'}
                </Text>
            </SkeletonText>
            <BNBCoin width='1em' />
            <SkeletonText
                noOfLines={1}
                spacing='5'
                skeletonHeight='4'
                isLoaded={!!etherBalance}
            >
                <Text color='white' fontSize='md'>
                    {(etherBalance &&
                        parseFloat(utils.formatEther(etherBalance)).toFixed(3)) ||
                        '00.000'}
                </Text>
            </SkeletonText>
            <Button
                display='flex'
                gridGap='1'
                bg='gray.800'
                border='1px solid transparent'
                _hover={{
                    border: '1px',
                    borderStyle: 'solid',
                    borderColor: 'blue.400',
                    backgroundColor: 'gray.700',
                }}
                borderRadius='xl'
                m='1px'
                px={3}
                height='38px'
                onClick={handleOpenModal}
            >
                {/* <Tag size='md' variant='outline' colorScheme='yellow'>
                <TagLabel>{etherBalance &&
                    parseFloat(formatEther(etherBalance)).toFixed(3)}
                </TagLabel>
                <TagRightIcon
                    as={BNBCoin}
                />
            </Tag>
            <Tag size='md' variant='outline' colorScheme='purple'>
                <TagLabel color='white'>{etherBalance &&
                    parseFloat(formatEther(etherBalance)).toFixed(0)} FMT</TagLabel>
            </Tag> */}
                <SkeletonText
                    noOfLines={1}
                    spacing='5'
                    skeletonHeight='4'
                    isLoaded={!!user?.publicAddress}
                >
                    <Text color='white' fontSize='md'>
                        {(user?.publicAddress && shortenIfAddress(user?.publicAddress)) ||
                            '0x0000...0000'}
                    </Text>
                </SkeletonText>
                <Identicon />
            </Button>
        </Flex>
    ) : (
        <Flex
            alignItems='center'
            as='button'
            h='auto'
            bgColor='#F6851B'
            paddingX='4'
            onClick={handleConnectWallet}
        >
            <div className='mt-1 mr-2'>
                <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    className='fill-current'
                >
                    <path d='M13 12h-2.625a.376.376 0 01-.375-.375v-1.25c0-.206.169-.375.375-.375H13c.553 0 1-.447 1-1V3c0-.553-.447-1-1-1h-2.625A.376.376 0 0110 1.625V.375c0-.206.169-.375.375-.375H13a3 3 0 013 3v6a3 3 0 01-3 3zm-1.469-6.281L6.281.469C5.813 0 5 .329 5 1v3H.75a.748.748 0 00-.75.75v3c0 .416.334.75.75.75H5v3c0 .672.813 1 1.281.531l5.25-5.25a.756.756 0 000-1.062z'></path>
                </svg>
            </div>
            Login with Metamask
        </Flex>
    );
}
