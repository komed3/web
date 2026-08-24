import { Link } from 'react-router';

export function Header () {
  return (
    <header className= 'sticky top-0 h-24'>
      <div className= ''>
        <Link
          to= '/'
          className= 'font-display text-4xl'
        >
          komed3
        </Link>
      </div>
    </header>
  );
}
