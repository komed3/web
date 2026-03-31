import { AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Cursor } from './effects/Cursor';
import { ScrollToTop } from './effects/ScrollTop';


export default function App () {
    return ( <Router>
        <div className="min-h-screen w-full flex flex-col selection:bg-black selection:text-white relative">
            <Cursor />
            <ScrollToTop />
        </div>
    </Router> );
}
