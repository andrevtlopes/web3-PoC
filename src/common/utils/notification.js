import { toast } from 'react-toastify';

export const TYPE = toast.TYPE;

export default function notification({ type, message, ...props }) {
    return toast(() => message, { type, ...props });
}
