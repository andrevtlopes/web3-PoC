import Head from 'next/head';

// Update with the contract address logged out to the CLI when it was deployed
export const prismaAddress = '0x2e7324e5ab995e9243d3c91c166470ab19e961da';

export default function Home() {
    // const greet = useGreet();
    // console.log(greet);

    // const handleGreeting = () => {
    //     if (!greeting) return;
    //     setGreeting(greeting);
    // };



    // // call the smart contract, send an update
    // async function setGreeting() {
    //     if (!greeting) return;
    //     if (typeof window.ethereum !== 'undefined') {
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //         const signer = provider.getSigner();
    //         const contract = new ethers.Contract(
    //             greeterAddress,
    //             Greeter.abi,
    //             signer
    //         );
    //         const transaction = await contract.setGreeting(greeting);
    //         await transaction.wait();
    //         fetchGreeting();
    //     }
    // }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <Head>
                <title>NextJS Test</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
        </div>
    );
}
