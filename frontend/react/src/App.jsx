import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardsPage from './views/DashboardsPage';


function App() {
  return (
    <Router>
      <div id="app">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DashboardsPage />} />
            {/* Puedes agregar más rutas aquí si es necesario */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// // import HomePage from './views/HomePage';
// // import ProfilePage from './views/ProfilePage';
// // import ShopPage from './views/ShopPage';
// // import CourtDetails from './components/details/CourtDetails';
// // import LessonDetails from './components/details/LessonDetails';

// function App() {
//   return (
//     <Router>
//       <div id="app">
//         <Header />
//         <Routes>
//           {/* <Route path="/" element={<HomePage />} />
//           <Route path="/shop" element={<ShopPage />} />
//           <Route path="/court/:id" element={<CourtDetails />} />
//           <Route path="/lesson/:id" element={<LessonDetails />} />
//           <Route path="/profile" element={<ProfilePage />} /> */}
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
