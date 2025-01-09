import { useCallback } from 'react';

const useLogout = () => {
    const handleLogout = useCallback(() => {
        localStorage.clear();
        window.location.href = 'http://localhost:8081/logout';
    }, []);

    return handleLogout;
};

export default useLogout;