import { AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Cursor } from './effects/Cursor';
import { ScrollToTop } from './effects/ScrollTop';
import { LandingPage } from './views/LandingPage';
import { ProjectPage } from './views/ProjectPage';


export default function App () {
    return ( <Router>
        <div className="min-h-screen w-full flex flex-col selection:bg-black selection:text-white relative">
            <Cursor />
            <ScrollToTop />

            <Header />
            <main className="flex-1 pt-20">
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={ <LandingPage /> } />
                        <Route path="/project/:id" element={ <ProjectPage /> } />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    </Router> );
}
