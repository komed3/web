import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


export default function App () {
    return ( <Router>
        <div className="min-h-screen w-full flex flex-col selection:bg-black selection:text-white relative">
        </div>
    </Router> );
}
