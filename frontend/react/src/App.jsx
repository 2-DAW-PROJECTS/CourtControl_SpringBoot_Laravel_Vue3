import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardsPage from './views/DashboardsPage';
import AdminHomePage from './views/AdminHomePage';

import CourtDetails from './components/details/CourtDetails';
import LessonDetails from './components/details/LessonDetails';
import SummerDetails from './components/details/SummerDetails';
import UserDetails from './components/details/UserDetails';

import CreateCourt from './components/details/createForms/createCourt';
import CreateLesson from './components/details/createForms/createLesson';
import CreateSummer from './components/details/createForms/createSummer';


import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
    return (
        <>
            <Header />
                <Routes>
                    <Route path="/" element={<AdminHomePage />} />
                    <Route path="/admin" element={<AdminHomePage />} />

                    <Route path="/admin/:type" element={<DashboardsPage />} />
                    
                    <Route path="/admin/courts/:id" element={<CourtDetails />} />
                    <Route path="/admin/lessons/:id" element={<LessonDetails />} />
                    <Route path="/admin/summers/:id" element={<SummerDetails />} />
                    <Route path="/admin/users/:id" element={<UserDetails />} />
                    
                    <Route path="/admin/courts/create" element={<CreateCourt />} />
                    <Route path="/admin/lessons/create" element={<CreateLesson />} />
                    <Route path="/admin/summers/create" element={<CreateSummer />} />

                </Routes>
            <Footer />
        </>
    );
};

export default App;
