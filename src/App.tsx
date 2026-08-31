import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

// Import your pages (will be created in upcoming steps)
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import MembersPage from './pages/MembersPage';

import CommitteesPage from './pages/CommitteesPage';
// import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import RushPage from './pages/RushPage';
// import GalleryPage from './pages/GalleryPage'; // Gallery is built but not yet live — re-enable when ready

// MUST be default import:
import NavBar from './components/NavBar/NavBar';

import { Footer } from './components/Footer/Footer';

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
}

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
                <Routes location={location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/members" element={<MembersPage />} />
                    <Route path="/committees" element={<CommitteesPage/>} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/rush" element={<RushPage />} />
                    {/* <Route path="/gallery" element={<GalleryPage />} /> */}
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <NavBar /> {/* NavBar can be outside Routes if it's always present */}
            <AnimatedRoutes />
            <Footer />
        </Router>
    );
}

export default App;
