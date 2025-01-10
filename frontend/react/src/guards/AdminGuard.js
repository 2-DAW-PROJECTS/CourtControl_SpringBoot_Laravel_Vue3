import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useLogout from '../hooks/useLogout';


const AdminGuard = ({ children }) => {
    const localUser = JSON.parse(localStorage.getItem('currentAdmin'));
    const reduxUser = useSelector((state) => state.users.currentUser);
    const user = localUser || reduxUser;

    const handleLogout = useLogout();

console.log(user.data.roles[0]);

    useEffect(() => {
        if (!user?.data?.roles?.[0] || user.data.roles[0] !== 'ADMIN') {
            handleLogout();
            console.log('Not an admin');
        }
    }, [user, handleLogout]);

    return user?.data?.roles?.[0] === 'ADMIN' ? children : null;
};

export default AdminGuard;