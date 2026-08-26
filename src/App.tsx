import { Route, Routes } from 'react-router';

import { Header } from './layout/Header';
import { Home } from './pages/Home';


const COLORS = {
  '/': 'text-black bg-white',
  '/stack': 'text-white bg-brutal-blue',
  '/index': 'text-white bg-black'
} as const;


export default function App () {
  return (
    <div className= ''>
      <Header />

      <main className= 'min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
        </Routes>
      </main>
    </div>
  );
}
