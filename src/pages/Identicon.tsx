import { useEffect, useRef } from 'react';
import { useEthers } from '@usedapp/core';
import styled from '@emotion/styled';
import Jazzicon from '@metamask/jazzicon';
import { Box } from '@chakra-ui/layout';
import { SkeletonCircle } from '@chakra-ui/skeleton';

type Props = {
    props?: any;
};

export default function Identicon({ props }: Props) {
    const ref = useRef<HTMLDivElement>();
    const { account } = useEthers();

    useEffect(() => {
        if (account && ref.current) {
            ref.current.innerHTML = '';
            ref.current.appendChild(
                Jazzicon(16, parseInt(account.slice(2, 10), 16))
            );
        }
    }, [account]);

    return <SkeletonCircle size='4' isLoaded={!!account}>
        <Box {...props} ref={ref as any} />
    </SkeletonCircle>;
}
