import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export function Header () {
  const [ menuOpen, setMenuOpen ] = useState( false );
  const location = useLocation();

  useEffect( () => setMenuOpen( false ), [ location.pathname ] );

  useEffect( () => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [ menuOpen ] );
}
