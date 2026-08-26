import { Route, Routes } from 'react-router';

import { Cursor } from './effects/Cursor';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { Home } from './pages/Home';


export default function App () {
  return (
    <>
      <Header />

      <main className= 'mt-24 min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
        </Routes>
      </main>

      <Footer />
      <Cursor />
    </>
  );
}
