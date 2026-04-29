import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/heroStyles.css";

function HeroNav() {
    const { token, isAuthenticated } = useAuth();
    const { theme } = useTheme();

    const getUserEmail = () => {
        if (!token) return 'Гостьовий режим';
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            return payload.email || 'Невідомий користувач';
        } catch (error) {
            return `Помилка читання даних` + {error};
        }
    };

    return (
        <div className="hero-nav__container">
            <h1 className="title">TaskHub</h1>
            <div className="hero-nav__container-options">
                {/* <button className={`btn btn--len click-element ${theme}-border`}>UA/EN</button> */}
                <div className={`gradient-${theme}--horizontal`}>
                    <div className="email__container prisma-bg">
                        <p>{isAuthenticated ? getUserEmail() : 'Авторизуйтесь'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroNav;