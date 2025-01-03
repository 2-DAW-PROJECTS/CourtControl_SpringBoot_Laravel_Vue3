import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Logo y descripción */}
                    <div className="flex items-center space-x-4">
                        <img src="/logo.png" alt="Logo CourtControl" className="h-16 w-16 rounded-full shadow-lg" />
                        <div>
                            <h1 className="text-lg font-semibold text-white">CourtControl</h1>
                            <p className="text-sm italic">&copy; 2024 | Precisión en cada jugada, control en cada espacio.</p>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 text-center">
                        <Link to="#" className="hover:text-white transition duration-300 text-sm">Privacidad</Link>
                        <Link to="#" className="hover:text-white transition duration-300 text-sm">Términos</Link>
                        <Link to="#" className="hover:text-white transition duration-300 text-sm">Contacto</Link>
                        <Link to="#" className="hover:text-white transition duration-300 text-sm">Sobre Nosotros</Link>
                    </div>

                    {/* Redes sociales */}
                    <div className="text-center md:text-right">
                        <p className="text-sm font-semibold mb-3">Síguenos en:</p>
                        <div className="social-links">
                            <a href="https://www.instagram.com" className="social-link">
                                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                                <span className="social-text">  Instagram</span>
                            </a>
                            <br />
                            <a href="https://www.twitter.com" className="social-link">
                                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
                                <span className="social-text">  Twitter</span>
                            </a>
                            <br />
                            <a href="https://www.facebook.com" className="social-link">
                                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
                                <span className="social-text">  Facebook</span>
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">Valencia, España</p>
                        <p className="text-xs text-gray-500 mt-4">Pero por la calle no!</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-500">
                    <p>Diseñado con ❤️ para la gestión de espacios deportivos.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
