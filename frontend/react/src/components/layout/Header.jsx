import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-900 text-gray-300 shadow-lg">
            <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
                {/* Logo y Nombre */}
                <div className="flex items-center space-x-4">
                    <img src="/logo.png" alt="Logo CourtControl" className="h-12 w-12 rounded-full" />
                    <span className="text-2xl font-bold text-white">CourtControl</span>
                </div>

                {/* Navegación */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/admin" className="text-sm font-medium hover:text-white transition duration-300">Inicio</Link>
                    {/* <Link to="/reservations" className="text-sm font-medium hover:text-white transition duration-300">Reservas</Link>
                    <Link to="/admin/courts" className="text-sm font-medium hover:text-white transition duration-300">Courts</Link>
                    <Link to="/admin/lessons" className="text-sm font-medium hover:text-white transition duration-300">Lessons</Link>
                    <Link to="/admin/summers" className="text-sm font-medium hover:text-white transition duration-300">Summers</Link>
                    <Link to="/admin/users" className="text-sm font-medium hover:text-white transition duration-300">Users</Link> */}
                    <Link to="/logout" className="text-sm font-medium hover:text-white transition duration-300">LogOut</Link>
                </nav>

                {/* Botón de Menú (Mobile) */}
                <button className="md:hidden text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Menú desplegable para móvil */}
            <div className="md:hidden bg-gray-800 text-gray-300">
                <nav className="hidden md:flex space-x-6">
                    <Link to="/admin" className="text-sm font-medium hover:text-white transition duration-300">Inicio</Link>
                    <Link to="/admin/users" className="text-sm font-medium hover:text-white transition duration-300">LogOut</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;