import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/userSlice';
import useLogout from '../hooks/useLogout';

const AdminGuard = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const accessToken = useSelector((state) => state.users.accessToken);
    const handleLogout = useLogout();

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchCurrentUser(accessToken));
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            handleLogout();
        }
    }, [user, handleLogout]);

    return user && user.role === 'ADMIN' ? children : null;
};

export default AdminGuard;