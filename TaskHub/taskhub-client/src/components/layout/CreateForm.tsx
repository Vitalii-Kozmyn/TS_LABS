import { useState } from 'react';
import { taskService } from '../../services/taskService';
import type { ITask } from '../../types/task';
import '../../styles/form.css';
import { useTheme } from '../../context/ThemeContext';

interface CreateFormProps {
    onClose: () => void;
    onTaskCreated: (newTask: ITask) => void;
}

function CreateForm({ onClose, onTaskCreated }: CreateFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [dueDate, setDueDate] = useState('');
    const { theme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Відправляємо на бекенд (якщо дата порожня, передаємо undefined)
            const newTask = await taskService.create({
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? dueDate : undefined
            });
            
            onTaskCreated(newTask); // Оновлюємо стан у батьківському компоненті
            onClose(); // Закриваємо модалку
        } catch (error) {
            console.error("Помилка при створенні завдання:", error);
            alert("Не вдалося створити завдання");
        }
    };

    return (
        <div className="modal-window">
            <div className="modal__content prisma-bg">
                <span className="close-btn--modal" onClick={onClose}>&times;</span>
                <h3 className="form-title">Створити нове завдання</h3>

                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Назва завдання *</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Назва"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Опис</label>
                        <textarea
                            id="description"
                            placeholder="Додаткова інформація..."
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="status">Статус</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'in_progress' | 'completed')}>
                                <option value="pending">Очікує</option>
                                <option value="in_progress">В процесі</option>
                                <option value="completed">Завершено</option>
                            </select>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="priority">Пріоритет</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                                <option value="low">Низький</option>
                                <option value="medium">Середній</option>
                                <option value="high">Високий</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Дата виконання</label>
                        <input 
                            type="date" 
                            id="dueDate" 
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className={`btn-submit gradient-${theme}--horizontal`}>
                            Зберегти завдання
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateForm;