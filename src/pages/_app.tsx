import 'tailwindcss/tailwind.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './Layout';
import store from '../app/store';
import { Provider } from 'react-redux';
import { ChainId, DAppProvider, Config, MULTICALL_ADDRESSES } from '@usedapp/core';

function MyApp({ Component, pageProps }) {
    const config: Config = {
        readOnlyChainId: ChainId.Localhost,
        multicallAddresses: {
            [ChainId.Localhost]: '0x5D2A95ab8c3cFA0D55746E55f62B42a969B0B4D6',
        }
        // readOnlyUrls: {
        //     [ChainId.Localhost]:
        //         'https://ropsten.infura.io/v3/9f64262c9457435a84d9cd1172ddc723',
        // },
    };

    return (
        <DAppProvider config={config}>
            <ChakraProvider>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ChakraProvider>
        </DAppProvider>
    );
}

export default MyApp;
