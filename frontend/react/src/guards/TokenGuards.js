import { useEffect } from 'react';
import useLogout from '../hooks/useLogout';

const TokenGuard = ({ token1, token2, children }) => {
    const handleLogout = useLogout();

    useEffect(() => {
        if (token1 !== token2) {
            handleLogout();
        }
    }, [token1, token2, handleLogout]);

    return token1 === token2 ? children : null;
};

export default TokenGuard;