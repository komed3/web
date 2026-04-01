import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '../components/ui/Button';
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

    const isLightBg = project.color === 'brutal-yellow' || project.color === 'brutal-orange';

    return ( <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        className="min-h-screen bg-white pt-24 pb-12 px-6 md:px-12"
    >
        <div className="max-w-5xl mx-auto space-y-12">

            {/** Back To Home */}
            <Button
                as={Link} to="/" bg="bg-white"
                className="hover:bg-brutal-blue hover:text-white inline-flex items-center gap-2 mb-8"
            ><ArrowLeft size={20} /> BACK</Button>
        </div>
    </motion.div> );
}
