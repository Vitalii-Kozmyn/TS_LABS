import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import '../../styles/nav.css';
import logo from "../../assets/logo-taskhub.png";
import iconCalendar from "../../assets/plan-logo.png";
import iconPlaning from "../../assets/planing-logo.png";
import iconLogin from "../../assets/icon-login.png";
import iconLogout from "../../assets/icon-logout.png";

interface NavProps {
    onOpenAuth: () => void;
}

function Nav({ onOpenAuth }: NavProps) {
    const { isAuthenticated, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    
    const [wave, setWave] = useState<{ x: number; y: number; color: string } | null>(null);

    const handleThemeChange = (e: React.MouseEvent, newTheme: 'turquoise' | 'sunflower' | 'lavender') => {
        const colors = {
            turquoise: 'var(--turquoise-color)',
            sunflower: 'var(--sunflower-color)',
            lavender: 'var(--lavender-color)'
        };

        setWave({ x: e.clientX, y: e.clientY, color: colors[newTheme] });
        
        setTheme(newTheme);

        setTimeout(() => {
            setWave(null);
        }, 700);
    };

    return (
        <>
            <nav className="nav">
                <div className={`nav__container--bg gradient-${theme}--linear`}>
                    <div className="nav__container prisma-bg">
                        <img className="logo" src={logo} alt="Logo" />
                        
                        <ul className="nav__menu">
                            <li className="menu-item">
                                <NavLink to="/calendar">
                                    <img className='icon click-element' src={iconCalendar} alt="calendar icon" />
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to="/planner">
                                    <img className='icon click-element' src={iconPlaning} alt="plan icon" />
                                </NavLink>
                            </li>
                        </ul>
                        
                        <div className="nav__menu">
                            <button 
                                className="color--turquoise click-element" 
                                onClick={(e) => handleThemeChange(e, 'turquoise')} 
                            />
                            <button 
                                className="color--sunflower click-element" 
                                onClick={(e) => handleThemeChange(e, 'sunflower')} 
                            />
                            <button 
                                className="color--lavender click-element" 
                                onClick={(e) => handleThemeChange(e, 'lavender')} 
                            />
                        </div>
                        
                        {isAuthenticated ? (
                            <button className='log-btn click-element' onClick={logout}>
                                <img src={iconLogout} alt="icon logout" className='icon'/>
                            </button>
                        ) : (
                            <button className='log-btn click-element' onClick={onOpenAuth}>
                                <img src={iconLogin} alt="icon login" className='icon'/>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {wave && (
                <div
                    className="theme-wave"
                    style={{
                        left: wave.x,
                        top: wave.y,
                        backgroundColor: wave.color
                    }}
                />
            )}
        </>
    );
}

export default Nav;