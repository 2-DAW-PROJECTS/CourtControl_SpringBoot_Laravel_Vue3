import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardPage from './views/DashboardsPage';

function App() {
  return (
    <div id="app">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <DashboardPage>
          {/* <h1>Esto es una prueba de funcionamiento</h1> */}
          {}
        </DashboardPage>
      </div>
      <Footer />
    </div>
  );
}

export default App;
