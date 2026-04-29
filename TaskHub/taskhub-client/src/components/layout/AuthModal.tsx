import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import '../../styles/form.css';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

export default function AuthModal({ onClose }: { onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { theme } = useTheme();

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            let data;
            if (isLogin) {
                data = await authService.login({ email, password });
            } else {
                data = await authService.register({ email, password });
            }
            
            login(data.token);
            onClose();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const backendMessage = err.response?.data?.message || 'Сталася помилка на сервері.';
                setError(backendMessage);
            } else {
                setError('Невідома помилка. Перевірте з\'єднання.');
            }
        }
    };

    return (
        <div className="modal-window">
            <div className="modal__content prisma-bg">
                <span className="close-btn--modal" onClick={onClose}>&times;</span>
                
                <h3 className="form-title">{isLogin ? 'Вхід в акаунт' : 'Створити акаунт'}</h3>

                {error && <p style={{ color: '#eb5757', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name.email@exm.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль *</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введіть пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className={`btn-submit gradient-${theme}--horizontal`}>
                            {isLogin ? 'Увійти' : 'Зареєструватися'}
                        </button>
                    </div>
                </form>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span 
                        className="click-element" 
                        style={{ color: '#a8b2d1', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                    >
                        {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
                    </span>
                </div>
            </div>
        </div>
    );
}