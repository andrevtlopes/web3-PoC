import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from "@chakra-ui/react"

type Props = {
    children: any;
    href: string;
    icon?: any;
};

function NavLink({ children, href, icon: Icon, ...props }: Props) {
    const router = useRouter();
    const theme = useTheme();
    const style = {
        background: router.asPath === href ? theme.colors.gray[800] : 'transparent',
    };

    return (
        <Link href={href} {...props}>
            <a className='items-center hidden gap-2 px-5 cursor-pointer md:flex' style={style}>
                {Icon && <Icon width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    className='fill-current' />}
        
            {children}
        </a>
    </Link>
  )
}

export default NavLink;