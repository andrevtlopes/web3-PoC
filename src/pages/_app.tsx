import 'tailwindcss/tailwind.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './Layout';
import store from '../app/store';
import { Provider } from 'react-redux';
import { ChainId, DAppProvider } from '@usedapp/core';

function MyApp({ Component, pageProps }) {
    const config = {
        readOnlyChainId: ChainId.Ropsten,
        readOnlyUrls: {
            [ChainId.Ropsten]:
                'https://ropsten.infura.io/v3/9f64262c9457435a84d9cd1172ddc723',
        },
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
