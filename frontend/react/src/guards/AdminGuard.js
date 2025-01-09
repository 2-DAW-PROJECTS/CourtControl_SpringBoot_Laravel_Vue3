import { useEffect } from 'react';
import useLogout from '../hooks/useLogout';

const AdminGuard = ({ user, children }) => {
    const handleLogout = useLogout();

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
        handleLogout();
        }
    }, [user, handleLogout]);

    return user && user.role === 'ADMIN' ? children : null;
};

export default AdminGuard;