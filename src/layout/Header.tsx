import { Link } from 'react-router';


export function Header () {
  return (
    <header className= 'fixed inset-x-0 top-0 h-24'>
      { /** Logo */ }
      <div className= 'centered'>
        <Link
          className= 'inline-flex justify-center items-center w-20 h-20 font-display text-4xl'
          to= '/'
        >
          <span>k</span>
        </Link>
      </div>
    </header>
  );
}
