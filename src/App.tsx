import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { Cursor } from './effects/Cursor';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';
import { Home } from './pages/Home';


const DURATION = 600;
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';


function PageTransition () {
  const location = useLocation();
  const navigate = useNavigate();

  const [ displayedLocation, setDisplayedLocation ] = useState(location);

  const blackRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const currentLocation = useRef(location);
  const running = useRef(false);

  useEffect(() => {
    currentLocation.current = location;
  }, [ location ]);

  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a');

      if (!link || link.target === '_blank') return;
      if (link.origin !== window.location.origin) return;
      if (link.pathname === currentLocation.current.pathname || running.current) return;

      event.preventDefault();
      running.current = true;

      const target = link.pathname + link.search + link.hash;
      const black = blackRef.current!;
      const blue = blueRef.current!;

      const block = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      const blockKeyboard = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };

      document.addEventListener('click', block, true);
      document.addEventListener('mousedown', block, true);
      document.addEventListener('mouseup', block, true);
      document.addEventListener('pointerdown', block, true);
      document.addEventListener('pointerup', block, true);
      document.addEventListener('touchstart', block, { capture: true, passive: false });
      document.addEventListener('touchmove', block, { capture: true, passive: false });
      document.addEventListener('touchend', block, { capture: true, passive: false });
      document.addEventListener('wheel', block, { capture: true, passive: false });
      document.addEventListener('contextmenu', block, true);
      document.addEventListener('dragstart', block, true);
      document.addEventListener('keydown', blockKeyboard, true);
      document.addEventListener('keyup', blockKeyboard, true);

      const htmlOverflow = document.documentElement.style.overflow;
      const bodyOverflow = document.body.style.overflow;

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      await black.animate(
        [
          { transform: 'translateX(-100%)' },
          { transform: 'translateX(0%)' }
        ],
        {
          duration: DURATION,
          easing: EASE,
          fill: 'forwards'
        }
      ).finished;

      navigate(target);

      setDisplayedLocation({
        ...currentLocation.current,
        pathname: link.pathname,
        search: link.search,
        hash: link.hash
      });

      window.scrollTo(0, 0);

      await blue.animate(
        [
          { transform: 'translateX(-100%)' },
          { transform: 'translateX(0%)' }
        ],
        {
          duration: DURATION,
          easing: EASE,
          fill: 'forwards'
        }
      ).finished;

      const blackOut = black.animate(
        [
          { transform: 'translateX(0%)' },
          { transform: 'translateX(100%)' }
        ],
        {
          duration: DURATION,
          easing: EASE,
          fill: 'forwards'
        }
      );

      const blueOut = blue.animate(
        [
          { transform: 'translateX(0%)' },
          { transform: 'translateX(100%)' }
        ],
        {
          duration: DURATION,
          easing: EASE,
          fill: 'forwards'
        }
      );

      await Promise.all([
        blackOut.finished,
        blueOut.finished
      ]);

      black.style.transform = 'translateX(-100%)';
      blue.style.transform = 'translateX(-100%)';

      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;

      document.removeEventListener('click', block, true);
      document.removeEventListener('mousedown', block, true);
      document.removeEventListener('mouseup', block, true);
      document.removeEventListener('pointerdown', block, true);
      document.removeEventListener('pointerup', block, true);
      document.removeEventListener('touchstart', block, true);
      document.removeEventListener('touchmove', block, true);
      document.removeEventListener('touchend', block, true);
      document.removeEventListener('wheel', block, true);
      document.removeEventListener('contextmenu', block, true);
      document.removeEventListener('dragstart', block, true);
      document.removeEventListener('keydown', blockKeyboard, true);
      document.removeEventListener('keyup', blockKeyboard, true);

      running.current = false;
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [ navigate ]);

  return (
    <>
      <Routes location= { displayedLocation }>
        <Route path= '/' element= { <Home /> } />
      </Routes>

      <div
        ref= { blackRef }
        className= 'fixed inset-0 z-99999 bg-black pointer-events-none'
        style= {{
          transform: 'translateX(-100%)'
        }}
      />

      <div
        ref= { blueRef }
        className= 'fixed inset-0 z-99999 bg-blue-600 pointer-events-none'
        style= {{
          transform: 'translateX(-100%)'
        }}
      />
    </>
  );
}


export default function App () {
  return (
    <>
      <Header />

      <main className= 'mt-24 min-h-screen'>
        <PageTransition />
      </main>

      <Footer />
      <Cursor />
    </>
  );
}