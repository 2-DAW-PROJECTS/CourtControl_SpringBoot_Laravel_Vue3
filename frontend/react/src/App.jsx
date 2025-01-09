import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const token1 = useSelector((state) => state.auth.token1);
    const token2 = useSelector((state) => state.auth.token2);
    const user = useSelector((state) => state.auth.user);

        return (
            <>
                <Header />
                    <Routes>
                        <Route path="/" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <AdminHomePage />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <AdminHomePage />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/:type" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <DashboardsPage />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/reservations/:type" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <ReservationsPage />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/courts/:id" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <CourtDetails />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/lessons/:id" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <LessonDetails />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/summers/:id" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <SummerDetails />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/users/:id" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <UserDetails />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/courts/create" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <CreateCourt />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/lessons/create" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <CreateLesson />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                        <Route path="/admin/summers/create" element={
                            <TokenGuard token1={token1} token2={token2}>
                                <AdminGuard user={user}>
                                    <CreateSummer />
                                </AdminGuard>
                            </TokenGuard>
                        }/>

                    </Routes>
                <Footer />
            </>
        );
    // return (
    //     <>
    //         <Header />
    //             <Routes>
    //                 <TokenGuard token1={token1} token2={token2}>
    //                     <AdminGuard user={user}>

    //                         <Route path="/" element={<AdminHomePage />} />
    //                         <Route path="/admin" element={<AdminHomePage />} />

    //                         <Route path="/admin/:type" element={<DashboardsPage />} />
    //                         {/* <Route path="/admin/reservations" element={<ReservationsPage />} /> */}
    //                         <Route path="/admin/reservations/:type" element={<ReservationsPage />} />

    //                         <Route path="/admin/courts/:id" element={<CourtDetails />} />
    //                         <Route path="/admin/lessons/:id" element={<LessonDetails />} />
    //                         <Route path="/admin/summers/:id" element={<SummerDetails />} />
    //                         <Route path="/admin/users/:id" element={<UserDetails />} />

    //                         <Route path="/admin/courts/create" element={<CreateCourt />} />
    //                         <Route path="/admin/lessons/create" element={<CreateLesson />} />
    //                         <Route path="/admin/summers/create" element={<CreateSummer />} />

    //                     </AdminGuard>
    //                 </TokenGuard>
    //             </Routes>
    //         <Footer />
    //     </>
    // );
};

export default App;
