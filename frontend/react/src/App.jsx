import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardsPage from './views/DashboardsPage';
import CourtDetails from './components/details/CourtDetails';
import LessonDetails from './components/details/LessonDetails';
import SummerDetails from './components/details/SummerDetails';
import UserDetails from './components/details/UserDetails';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<DashboardsPage />} />
                <Route path="/admin/courts/:id" element={<CourtDetails />} />
                <Route path="/admin/lessons/:id" element={<LessonDetails />} />
                <Route path="/admin/summers/:id" element={<SummerDetails />} />
                <Route path="/admin/users/:id" element={<UserDetails />} />
                <Route path="/admin/:type" element={<DashboardsPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
