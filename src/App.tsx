import { Routes } from 'react-router';

import { useTheme } from './context/ThemeContext';
import { Cursor } from './effects/Cursor';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';


export default function App () {
  const { contentVisible } = useTheme();

  return (
    <div className= 'bg-(--accent) text-(--main)'>
      <Header />

      <div
        style= { {
          opacity: contentVisible ? 1 : 0,
          transition: 'all 0.35s linear'
        } }
      >
        <main className= 'min-h-screen'>
          <Routes></Routes>
        </main>

        <Footer />
      </div>

      <Cursor />
    </div>
  );
}
