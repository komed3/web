import { Route, Routes, useLocation } from 'react-router';

import { Header } from './layout/Header';
import { Home } from './pages/Home';


const COLORS = {
  '/': 'text-black bg-white',
  '/stack': 'text-white bg-brutal-blue',
  '/index': 'text-white bg-black'
} as const;


export default function App () {
  const { pathname } = useLocation();

  return (
    <div className= { ( ( COLORS as any )[ pathname ] ?? '' ) }>
      <Header />

      <main className= 'min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
        </Routes>
      </main>
    </div>
  );
}
