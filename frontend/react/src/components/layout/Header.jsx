
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [notifications] = useState(3);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = 'http://localhost:8081/logout';
    };

    return (

        <header className={`w-full transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-gray-900'} text-gray-300 shadow-lg`}>
            <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
                {/* Logo y Nombre */}
                <div className="flex items-center space-x-4">


                    <img src="/logo.png" alt="Logo CourtControl" className="h-12 w-12 rounded-full hover:scale-110 transition-transform duration-300" />
                    <span className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300">CourtControl</span>
                </div>

                {/* Hora actual */}
                <div className="hidden lg:block text-sm font-medium">
                    {currentTime.toLocaleTimeString()}
                </div>

                {/* Navegación */}

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/admin" className="text-sm font-medium hover:text-white transition duration-300">Inicio</Link>

                    <Link to="/admin/reservations/court" className="text-sm font-medium hover:text-white transition duration-300">Bookings</Link>
                    <Link to="/admin/courts" className="text-sm font-medium hover:text-white transition duration-300">Dashboards</Link>
                    {/* Notificaciones */}
                    <div className="relative">
                        <button className="text-sm font-medium hover:text-white transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {notifications > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                                    {notifications}
                                </span>
                            )}
                        </button>
                    </div>
                    <button onClick={handleLogout} className="text-sm font-medium bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300">LogOut</button>
                </nav>

                {/* Botón de Menú (Mobile) */}
                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Menú desplegable para móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 text-gray-300">
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link to="/admin" className="text-sm font-medium hover:text-white transition duration-300">Inicio</Link>

                        <Link to="/dashboard" className="text-sm font-medium hover:text-white transition duration-300">Dashboard</Link>
                        <Link to="/profile" className="text-sm font-medium hover:text-white transition duration-300">Perfil</Link>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Notificaciones</span>
                            <span className="bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                                {notifications}
                            </span>
                        </div>
                        <Link to="/logout" className="text-sm font-medium bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300 text-center">LogOut</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;