import type { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Background } from './effects/Background';
import { Cursor } from './effects/Cursor';
import { ScrollToTop } from './lib/scrollToTop';
import { LandingPage } from './views/LandingPage';
import { ProjectPage } from './views/ProjectPage';


export default function App () : JSX.Element {
    return ( <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-brutal-pink selection:text-brutal-white">
            <Cursor />
            <Background />
            <Navbar />
            <main className="flex-grow relative z-10">
                <Routes>
                    <Route path="/" element={ <LandingPage /> } />
                    <Route path="/project/:repoName" element={ <ProjectPage /> } />
                </Routes>
            </main>
            <Footer />
        </div>
    </Router> );
}
