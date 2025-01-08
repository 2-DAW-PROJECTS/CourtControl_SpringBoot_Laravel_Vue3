import { Link } from "react-router-dom";

const AdminHomePage = () => {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-center" style={{ backgroundColor: "#f6f1de" }}>
            <h1 className="text-4xl font-extrabold mb-12 text-center" style={{ color: "#23232f" }}>
                CourtControl Management Hub 🏀🏐
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                <Link 
                    to="/admin/courts" 
                    className="flex flex-col items-center justify-center rounded-xl shadow-xl transition duration-300 p-8 text-center"
                    style={{ backgroundColor: "#92d8be", color: "#23232f" }}>
                    <h2 className="text-2xl font-bold mb-4">🏟️ Court Management</h2>
                    <p>Gestiona tus pistas deportivas</p>
                </Link>

                <Link 
                    to="/admin/lessons" 
                    className="flex flex-col items-center justify-center rounded-xl shadow-xl transition duration-300 p-8 text-center"
                    style={{ backgroundColor: "#9bada1", color: "#23232f" }}>
                    <h2 className="text-2xl font-bold mb-4">👨‍🏫 Training Lessons</h2>
                    <p>Organiza sesiones de entrenamiento</p>
                </Link>

                <Link 
                    to="/admin/summers" 
                    className="flex flex-col items-center justify-center rounded-xl shadow-xl transition duration-300 p-8 text-center"
                    style={{ backgroundColor: "#f5ce8d", color: "#23232f" }}>
                    <h2 className="text-2xl font-bold mb-4">⛺ Summer Camps</h2>
                    <p>Gestión de campamentos deportivos</p>
                </Link>

                <Link 
                    to="/admin/users" 
                    className="flex flex-col items-center justify-center rounded-xl shadow-xl transition duration-300 p-8 text-center"
                    style={{ backgroundColor: "#fc9b70", color: "#23232f" }}>
                    <h2 className="text-2xl font-bold mb-4">👥 Users</h2>
                    <p>Control de deportistas y entrenadores</p>
                </Link>

                <Link 
                    to="/admin/reservations/court" 
                    className="flex flex-col items-center justify-center rounded-xl shadow-xl transition duration-300 p-8 text-center col-span-2"
                    style={{ backgroundColor: "#eb6a65", color: "#f6f1de" }}>
                    <h2 className="text-2xl font-bold mb-4">📅 Bookings</h2>
                    <p>Reserva de pistas y gestión de horarios</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminHomePage;
