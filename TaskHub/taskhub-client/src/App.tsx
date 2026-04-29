import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Nav from './components/layout/Nav';
import HeroSection from './components/sections/HeroSection';
import CalendarSection from './components/sections/CalendarSection';
import AuthModal from './components/layout/AuthModal';

function App() {
    const { isAuthenticated } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div className="page">
            <Nav onOpenAuth={() => setIsAuthModalOpen(true)} />
            
            <main className='content'>
                <Routes>
                    <Route path="/calendar" element={<CalendarSection />} />
                    <Route 
                        path="/planner" 
                        element={isAuthenticated ? <HeroSection /> : <Navigate to="/calendar" replace />} 
                    />
                    <Route path="*" element={<Navigate to="/calendar" replace />} />
                </Routes>
            </main>

            {isAuthModalOpen && !isAuthenticated && (
                <AuthModal onClose={() => setIsAuthModalOpen(false)} />
            )}
        </div>
    );
}

export default App;