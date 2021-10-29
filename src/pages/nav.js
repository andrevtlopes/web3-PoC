import { useState, useEffect, useCallback } from 'react';
import ConnectButton from './ConnectButton';
import MemoryToken from './MemoryToken.json';
import { useDisclosure } from '@chakra-ui/react';
import AccountModal from './AccountModal';
import Link from 'next/link';

export default function Nav() {
    const [account, setAccount] = useState();
    const [token, setToken] = useState();
    const [totalSupply, setTotalSupply] = useState();
    const [tokenURIs, setTokenURIs] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Load smart contract
        const networkId = await web3.eth.net.getId();
        const networkData = MemoryToken.networks[networkId];
        if (networkData) {
            const abi = MemoryToken.abi;
            const address = networkData.address;
            const token = new web3.eth.Contract(abi, address);
            setToken(token);
            const totalSupply = await token.methods.totalSupply().call();
            setTotalSupply(totalSupply);
            // Load Tokens
            let balanceOf = await token.methods.balanceOf(accounts[0]).call();
            for (let i = 0; i < balanceOf; i++) {
                let id = await token.methods
                    .tokenOfOwnerByIndex(accounts[0], i)
                    .call();
                let tokenURI = await token.methods.tokenURI(id).call();
                setTokenURIs([...tokenURIs, tokenURI]);
            }
        } else {
            alert('Smart contract not deployed to detected network.');
        }
    };
    const handleClick = async () => {
        await loadBlockchainData();
        console.log(account, token, totalSupply)
    };
    
    return (
        <div className='fixed top-0 items-start w-full'>
            <div className='inline-flex w-full bg-[#11131b] text-white align-middle text-sm'>
                <Link href='/'>
                    <div
                        className='my-2 mx-3 w-[75px] h-[36px] flex gap-2 items-center justify-center'
                        // src='/static/image/logo.png'
                    >
                        FAMON
                        <svg
                            className='fill-current'
                            version='1.0'
                            xmlns='http://www.w3.org/2000/svg'
                            width='1280.000000pt'
                            height='1173.000000pt'
                            viewBox='0 0 1280.000000 1173.000000'
                            preserveAspectRatio='xMidYMid meet'
                        >
                            <g
                                transform='translate(0.000000,1173.000000) scale(0.100000,-0.100000)'
                                stroke='none'
                            >
                                <path
                                    d='M3 11714 c-9 -24 238 -513 367 -724 164 -270 196 -312 507 -677 298
                                    -348 434 -487 713 -724 275 -233 513 -402 855 -608 94 -57 171 -106 173 -111
                                    2 -5 -12 -39 -31 -77 -120 -241 -195 -563 -256 -1103 -32 -281 -76 -442 -191
                                    -695 -38 -82 -76 -177 -86 -210 -21 -75 -14 -184 17 -275 41 -118 204 -430
                                    273 -520 84 -111 278 -328 364 -407 57 -54 65 -65 56 -80 -212 -332 -292 -500
                                    -354 -748 -48 -187 -63 -341 -64 -620 0 -239 1 -254 26 -345 64 -235 196 -521
                                    348 -758 79 -122 91 -147 86 -173 -10 -51 -56 -158 -143 -332 -157 -314 -203
                                    -459 -211 -654 -6 -155 12 -239 79 -372 88 -176 230 -353 397 -492 l42 -36
                                    -51 -64 c-164 -205 -279 -427 -279 -540 0 -44 17 -79 39 -79 3 0 12 -14 18
                                    -30 9 -24 17 -30 40 -30 15 0 41 -7 57 -15 15 -8 35 -15 42 -15 24 0 235 113
                                    334 180 119 79 308 218 380 280 116 98 101 93 314 101 105 5 310 13 456 19
                                    181 7 317 18 430 35 91 14 186 25 212 25 86 0 292 -32 558 -86 581 -120 656
                                    -135 751 -147 l98 -12 -53 -122 c-30 -67 -64 -150 -76 -185 -27 -79 -30 -161
                                    -5 -188 27 -30 134 -80 171 -80 18 0 36 -5 39 -10 18 -30 130 17 296 125 195
                                    127 292 207 485 401 156 157 203 198 255 224 128 64 233 141 334 244 118 119
                                    179 209 305 444 214 403 311 701 316 975 l2 128 184 64 c100 35 262 92 358
                                    128 96 35 200 72 230 82 60 19 90 40 90 62 0 8 -30 81 -67 161 -85 189 -149
                                    342 -162 387 -12 44 -40 28 362 197 172 71 341 144 377 163 92 46 98 4 -101
                                    653 -54 177 -99 329 -99 336 0 8 10 16 23 19 12 3 105 35 207 72 102 36 275
                                    98 385 137 110 39 228 83 261 98 l62 28 -9 48 c-5 27 -27 101 -48 164 -22 63
                                    -92 286 -155 495 -64 209 -127 415 -140 457 l-24 77 31 10 c18 5 120 33 227
                                    61 107 29 281 78 385 111 223 68 1605 530 1750 584 132 50 235 102 235 120 0
                                    52 -101 309 -233 590 -65 139 -544 1117 -758 1548 l-73 149 -33 -5 c-44 -7
                                    -122 -48 -524 -274 -284 -159 -518 -306 -1513 -948 -647 -418 -1198 -776
                                    -1224 -795 -26 -20 -48 -45 -50 -56 -2 -12 28 -63 74 -129 124 -178 1184
                                    -1775 1205 -1818 11 -21 19 -40 17 -42 -2 -1 -46 -17 -98 -35 -52 -18 -198
                                    -73 -325 -122 -126 -49 -288 -112 -360 -139 -71 -28 -136 -56 -144 -64 -18
                                    -18 -8 -54 61 -220 145 -345 328 -802 328 -817 0 -11 -84 -59 -288 -163 -158
                                    -81 -293 -152 -300 -158 -20 -16 -10 -42 118 -307 119 -246 160 -340 160 -364
                                    0 -13 -352 -189 -402 -201 -33 -8 -27 -26 -78 270 -42 247 -89 464 -165 760
                                    -42 165 -162 675 -232 980 -117 520 -281 1533 -348 2160 -98 912 -105 948
                                    -291 1427 -46 120 -84 222 -84 227 0 5 21 12 48 15 117 17 524 133 837 239
                                    180 61 591 242 760 334 282 153 662 405 910 601 129 103 564 531 656 647 109
                                    136 107 145 -33 145 -57 0 -159 -5 -228 -10 -69 -6 -228 -14 -355 -20 -343
                                    -15 -483 -28 -655 -61 -343 -67 -856 -206 -1115 -302 -472 -177 -1110 -516
                                    -1468 -781 -42 -31 -86 -56 -97 -56 -11 0 -94 31 -184 69 -363 154 -703 243
                                    -1076 283 -181 19 -609 16 -790 -5 -376 -45 -651 -113 -1029 -256 -74 -28
                                    -138 -51 -141 -51 -4 0 -18 15 -31 34 -47 66 -346 393 -524 572 -181 181 -296
                                    282 -565 495 -217 173 -267 208 -610 426 -306 195 -466 289 -580 340 -484 217
                                    -708 307 -840 337 -84 20 -119 20 -127 0z'
                                />
                            </g>
                        </svg>
                    </div>
                </Link>
                <Link
                    href='/buy-packs'
                >
                    <a className='items-center hidden px-5 bg-gray-800 cursor-pointer md:flex'>
                    <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        className='fill-current'
                    >
                        <path d='M15.637 3.011L13.95.381A.836.836 0 0013.247 0H2.752a.836.836 0 00-.704.38L.362 3.012C-.508 4.37.264 6.26 1.89 6.475c.117.015.236.022.356.022.768 0 1.45-.33 1.917-.84.467.51 1.15.84 1.917.84.769 0 1.45-.33 1.917-.84.467.51 1.15.84 1.917.84.769 0 1.45-.33 1.917-.84a2.6 2.6 0 002.273.818c1.631-.214 2.406-2.103 1.533-3.464zm-1.884 4.301c-.26 0-.517-.038-.766-.096V9.75H3.012V7.216c-.25.056-.507.096-.766.096-.156 0-.315-.01-.468-.03a3.332 3.332 0 01-.426-.091v4.997c0 .449.371.812.831.812h11.638c.46 0 .831-.363.831-.813V7.191c-.14.04-.28.073-.426.091-.158.02-.314.03-.473.03z'></path>
                    </svg>
                    <div className='ml-2'>Buy Pack</div>
                    </a>
                </Link>
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
