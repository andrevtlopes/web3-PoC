import { useState, useEffect, useCallback } from 'react';
import ConnectButton from '../../pages/ConnectButton';
import MemoryToken from '../../pages/MemoryToken.json';
import { useDisclosure } from '@chakra-ui/react';
import AccountModal from '../../pages/AccountModal';
import Link from 'next/link';
import NavLink from './NavLink';
import FamonIcon from './FamonIcon';

export default function Navbar() {
    const [account, setAccount] = useState();
    const [token, setToken] = useState();
    const [totalSupply, setTotalSupply] = useState();
    const [tokenURIs, setTokenURIs] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className='fixed top-0 z-50 items-start w-full'>
            <div className='inline-flex w-full bg-[#11131b] text-white align-middle text-sm h-14'>
                <Link href='/'>
                    <div
                        className='my-2 mx-3 w-[75px] h-[36px] flex gap-2 items-center justify-center'
                        // src='/static/image/logo.png'
                    >
                        FAMON
                        <FamonIcon />
                    </div>
                </Link>
                <NavLink href='/token-whitelist'>Whitelist</NavLink>
                <NavLink
                    href='/open-packs'
                    icon={() => (
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            className='fill-current'
                        >
                            <path d='M15.637 3.011L13.95.381A.836.836 0 0013.247 0H2.752a.836.836 0 00-.704.38L.362 3.012C-.508 4.37.264 6.26 1.89 6.475c.117.015.236.022.356.022.768 0 1.45-.33 1.917-.84.467.51 1.15.84 1.917.84.769 0 1.45-.33 1.917-.84.467.51 1.15.84 1.917.84.769 0 1.45-.33 1.917-.84a2.6 2.6 0 002.273.818c1.631-.214 2.406-2.103 1.533-3.464zm-1.884 4.301c-.26 0-.517-.038-.766-.096V9.75H3.012V7.216c-.25.056-.507.096-.766.096-.156 0-.315-.01-.468-.03a3.332 3.332 0 01-.426-.091v4.997c0 .449.371.812.831.812h11.638c.46 0 .831-.363.831-.813V7.191c-.14.04-.28.073-.426.091-.158.02-.314.03-.473.03z'></path>
                        </svg>
                    )}
                >
                    Open Packs
                </NavLink>
                <NavLink href='/prismas'>Prismas</NavLink>
                <div className='items-center hidden ml-auto border-r border-gray-600 md:flex'>
                    <div className='px-4'></div>
                </div>
                {/* <button
                    className='px-5 items-center bg-[#F6851B] hidden md:flex'
                    onClick={account ? undefined : handleClick}
                >
                    {account ? shrinkAccount(account) : <>
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
                        Login with Metamask</>
                    }
                </button> */}
                <ConnectButton handleOpenModal={onOpen} />
                <AccountModal isOpen={isOpen} onClose={onClose} />
                <div className='flex items-center px-5 ml-auto cursor-pointer md:hidden'>
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        className='fill-current'
                    >
                        <path d='M.571 3.571H15.43A.571.571 0 0016 3V1.571A.571.571 0 0015.429 1H.57A.571.571 0 000 1.571V3c0 .316.256.571.571.571zm0 5.715H15.43A.571.571 0 0016 8.714V7.286a.571.571 0 00-.571-.572H.57A.571.571 0 000 7.286v1.428c0 .316.256.572.571.572zm0 5.714H15.43a.571.571 0 00.571-.571V13a.571.571 0 00-.571-.571H.57A.571.571 0 000 13v1.429c0 .315.256.571.571.571z'></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
