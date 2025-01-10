import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setTokens } from './store/slices/userSlice';

// import Constants from './Constants';

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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encryptedAccessToken = urlParams.get('accessToken');
        const encryptedRefreshToken = urlParams.get('refreshToken');
        const userParam = urlParams.get('user');


        if (encryptedAccessToken && encryptedRefreshToken && userParam) {
            try {
            const accessTokenDecrypt = atob(encryptedAccessToken);
            const refreshTokenDecrypr = atob(encryptedRefreshToken);
            const user = JSON.parse(decodeURIComponent(userParam));
                // console.log(accessToken);
                // console.log(refreshToken);
                // console.log(user);
            dispatch(setTokens({ accessTokenDecrypt, refreshTokenDecrypr }));

                localStorage.setItem('accessToken', accessTokenDecrypt);
                localStorage.setItem('refreshToken', refreshTokenDecrypr);
                localStorage.setItem('currentAdmin', JSON.stringify(user));

                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
                console.error('Error decoding tokens:', error);
            }
        }
    }, [dispatch]);

    // const storetest = useSelector((state) => state.users.currentAdmin);
    // console.log(storetest);

    return (
        <>
            <Header />
                <Routes>
                    <Route path="/" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                                <AdminHomePage />
                        </TokenGuard>
                    }/>

                    <Route path="/admin" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <AdminHomePage />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/:type" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <DashboardsPage />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/reservations/:type" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <ReservationsPage />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/courts/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <CourtDetails />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/lessons/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <LessonDetails />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/summers/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <SummerDetails />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/users/:id" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <UserDetails />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/courts/create" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <CreateCourt />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/lessons/create" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <CreateLesson />
                            </AdminGuard>
                        </TokenGuard>
                    }/>

                    <Route path="/admin/summers/create" element={
                        <TokenGuard token1={accessToken} token2={refreshToken}>
                            <AdminGuard user={localStorage.getItem('currentAdmin')}>
                                <CreateSummer />
                            </AdminGuard>
                        </TokenGuard>
                    }/>
                </Routes>
            <Footer />
        </>
    );
};

export default App;
