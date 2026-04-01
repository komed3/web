import { Link, useParams } from 'react-router-dom';

import projects from '../data/projects.json';


export function ProjectPage () {
    const { id } = useParams();
    const project = projects.find( p => p.id === id );

    if ( ! project ) return ( <div className="min-h-screen flex flex-col items-center justify-center p-12">
        <h1 className="text-6xl font-display font-black mb-8">
            <span className="text-brutal-pink">404</span> PROJECT NOT FOUND
        </h1>
        <Link to="/" className="brutal-btn bg-brutal-yellow">BACK TO HOME</Link>
    </div> );

    return ( <></> );
}
