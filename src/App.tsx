import { Route, Routes } from 'react-router';

import { Header } from './layout/Header';
import { Home } from './pages/Home';


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
