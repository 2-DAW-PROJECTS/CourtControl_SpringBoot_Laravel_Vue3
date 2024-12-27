import React from 'react';
import { Link } from 'react-router-dom';

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
                        <div className="flex justify-center md:justify-end space-x-6">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                                <i className="fab fa-instagram text-lg"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                                <i className="fab fa-twitter text-lg"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                                <i className="fab fa-facebook text-lg"></i>
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


// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//     return (
//         <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//                 <img src="/logo.png" alt="Logo CourtControl" className="h-12 w-12 mr-3" />
//                 <div>
//                 <p className="text-sm">&copy; 2024 CourtControl</p>
//                 <p className="text-xs">Precisión en cada jugada, control en cada espacio.</p>
//                 </div>
//             </div>
//             <div className="flex space-x-4 mb-4 md:mb-0">
//                 <Link to="#" className="text-sm hover:underline">Privacidad</Link>
//                 <Link to="#" className="text-sm hover:underline">Términos</Link>
//                 <Link to="#" className="text-sm hover:underline">Contacto</Link>
//                 <Link to="#" className="text-sm hover:underline">Sobre Nosotros</Link>
//             </div>
//             <div className="text-center md:text-right">
//                 <p className="text-sm mb-2">Síguenos en:</p>
//                 <div className="flex justify-center md:justify-end space-x-4">
//                 <a href="#" className="text-sm hover:underline">Instagram</a>
//                 <a href="#" className="text-sm hover:underline">Twitter</a>
//                 <a href="#" className="text-sm hover:underline">Facebook</a>
//                 </div>
//                 <p className="text-xs mt-2">Valencia, España</p>
//             </div>
//             </div>
//         </div>
//         </footer>
//     );
// };

// export default Footer;