import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setTokens, fetchCurrentUser } from './store/slices/userSlice';

import Constants from './Constants';

import DashboardsPage from './views/DashboardsPage';
import AdminHomePage from './views/AdminHomePage';
import ReservationsPage from './views/ReservationsPage';

import CourtDetails from './components/details/CourtDetails';
import LessonDetails from './components/details/LessonDetails';
import SummerDetails from './components/details/SummerDetails';
import UserDetails from './components/details/UserDetails';

import CreateCourt from './components/details/createForms/createCourt';
import CreateLesson from './components/details/createForms/createLesson';
import CreateSummer from './components/details/createForms/createSummer';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import TokenGuard from '../src/guards/TokenGuards';
import AdminGuard from '../src/guards/AdminGuard';

const App = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.users.accessToken);
    const refreshToken = useSelector((state) => state.users.refreshToken);
    const user = useSelector((state) => state.users.currentUser);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedAccessToken = urlParams.get('accessToken');
        const encryptedRefreshToken = urlParams.get('refreshToken');


        if (encryptedAccessToken && encryptedRefreshToken) {
            try {
            const accessToken = atob(encryptedAccessToken);
            const refreshToken = atob(encryptedRefreshToken);

                console.log(accessToken);
                console.log(refreshToken);

                dispatch(setTokens({ accessToken, refreshToken }));
                dispatch(fetchCurrentUser(accessToken));

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
                console.error('Error decoding tokens:', error);
            }
        }
    }, [dispatch]);

    return (
        <>
            <Header />
                <Routes>
                    <Route path="/" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <AdminHomePage />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <AdminHomePage />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/:type" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <DashboardsPage />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/reservations/:type" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <ReservationsPage />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/courts/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <CourtDetails />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/lessons/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <LessonDetails />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/summers/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <SummerDetails />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/users/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <UserDetails />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/courts/create" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <CreateCourt />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/lessons/create" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <CreateLesson />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>

                    <Route path="/admin/summers/create" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            {/* <AdminGuard user={user}> */}
                                <CreateSummer />
                            {/* </AdminGuard> */}
                        </TokenGuard>
                    }/>
                </Routes>
            <Footer />
        </>
    );
};

export default App;
