import { Route, Routes, useNavigate } from 'react-router';

import { useTheme } from './context/ThemeContext';
import { Cursor } from './effects/Cursor';
import { PageTransition } from './effects/PageTransition';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';

import { Home } from './views/Home';
import { Index } from './views/Index';
import { NotFound } from './views/NotFound';
import { Project } from './views/Project';
import { Stack } from './views/Stack';


export default function App () {
  const { target, contentVisible, setContentVisible, overlayColor, setColorVars } = useTheme();
  const navigate = useNavigate();

  return (
    <div className= 'bg-(--accent) text-(--main)'>
      { /** Header */ }
      <Header />

      { /** Page */ }
      <div
        style= { {
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.35s linear'
        } }
      >
        { /** Content */ }
        <main className= 'min-h-screen'>
          <Routes>
            <Route path= '/' element= { <Home /> } />
            <Route path= '/stack' element= { <Stack /> } />
            <Route path= '/project/:id' element= { <Project /> } />
            <Route path= '/index' element= { <Index /> } />
            <Route path= '*' element= { <NotFound /> } />
          </Routes>
        </main>

        { /** Footer */ }
        <Footer />
      </div>

      { /** Effect: Cursor */ }
      <Cursor />

      { /** Effect: Page Transition */ }
      { target && (
        <PageTransition
          color= { overlayColor }
          onComplete= { () => {
            window.scrollTo( 0, 0 );

            setColorVars( new URL( target, window.location.origin ).pathname );
            navigate( target );

            setTimeout( () => setContentVisible( true ), 50 );
          } }
        />
      ) }
    </div>
  );
}
