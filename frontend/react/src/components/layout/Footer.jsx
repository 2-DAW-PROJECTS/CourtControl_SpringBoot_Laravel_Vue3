import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert('¡Gracias por suscribirte a nuestro newsletter!');
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer className="bg-gray-900 text-gray-300 py-10 relative">
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce"
                    aria-label="Volver arriba"
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            )}
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                    {/* Logo y descripción */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <img src="/logo.png" alt="Logo CourtControl" className="h-16 w-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-300" />
                            <div>
                                <h1 className="text-lg font-semibold text-white">CourtControl</h1>
                                <p className="text-sm italic">© 2024 | Precisión en cada jugada, control en cada espacio.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+34 666 666 666</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>courtcontrol@courtcontrol.com</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>Valencia, España</span>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-white font-semibold mb-2">Enlaces Rápidos</h3>
                        <Link to="/" className="hover:text-white transition duration-300 text-sm hover:translate-x-2 transform">Privacidad</Link>
                        <Link to="/" className="hover:text-white transition duration-300 text-sm hover:translate-x-2 transform">Términos</Link>
                        <Link to="/" className="hover:text-white transition duration-300 text-sm hover:translate-x-2 transform">Contacto</Link>
                        <Link to="/" className="hover:text-white transition duration-300 text-sm hover:translate-x-2 transform">Sobre Nosotros</Link>
                        <Link to="/" className="hover:text-white transition duration-300 text-sm hover:translate-x-2 transform">FAQ</Link>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-white font-semibold">Suscríbete a nuestro Newsletter</h3>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                            <input 
                                type="email" 
                                placeholder="Tu email" 
                                className="bg-gray-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Suscribirse
                            </button>
                        </form>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-white font-semibold">Síguenos en:</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="https://www.instagram.com" className="social-link hover:text-pink-500 transition-colors duration-300 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                                <span className="social-text">Instagram</span>
                            </a>
                            <a href="https://www.twitter.com" className="social-link hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
                                <span className="social-text">Twitter</span>
                            </a>
                            <a href="https://www.facebook.com" className="social-link hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
                                <span className="social-text">Facebook</span>
                            </a>
                            <a href="https://www.linkedin.com" className="social-link hover:text-blue-500 transition-colors duration-300 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                                <span className="social-text">LinkedIn</span>
                            </a>
                            <a href="https://www.youtube.com" className="social-link hover:text-red-500 transition-colors duration-300 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faYoutube} className="text-lg" />
                                <span className="social-text">YouTube</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-xs text-gray-500">Diseñado con ❤️ para la gestión de espacios deportivos.</p>
                    <p className="text-xs text-gray-500 mt-2">© 2024 CourtControl. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;