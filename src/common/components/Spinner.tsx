import {
    Box,
    Button,
    Flex,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
} from '@chakra-ui/react';

type Props = {
    isOpen: any;
    onClose?: any;
    message?: string;
};

function Spinner({
    isOpen,
    onClose,
    message = 'Please, do not close the page. We are processing this request...',
}: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
            <ModalOverlay />
            <ModalContent
                bg='gray.900'
                border='1px'
                borderStyle='solid'
                borderColor='gray.700'
                borderRadius='3xl'
            >
                <ModalBody>
                    <Box className='spinner' />
                </ModalBody>
                <ModalFooter px={6} pb={8} pt={0}>
                    <Text color='white' align='center' fontSize='18'>
                        {message}
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Spinner;
