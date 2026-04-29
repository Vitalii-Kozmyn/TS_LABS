import { useState } from 'react';
import { taskService } from '../../services/taskService';
import type { ITask } from '../../types/task';
import '../../styles/form.css';
import { useTheme } from '../../context/ThemeContext';

interface EditFormProps {
    task: ITask;
    onClose: () => void;
    onTaskUpdated: (updatedTask: ITask) => void;
    onTaskDeleted: (taskId: string) => void;
}

function EditForm({ task, onClose, onTaskUpdated, onTaskDeleted }: EditFormProps) {
    // Ініціалізуємо стани даними з обраного завдання
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const { theme } = useTheme();
    
    // Форматуємо дату для інпута (YYYY-MM-DD), якщо вона є
    const initialDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
    const [dueDate, setDueDate] = useState(initialDate);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedData = {
                title,
                description,
                status,
                priority,
                dueDate: dueDate ? dueDate : undefined
            };
            const updatedTask = await taskService.update(task._id, updatedData);
            onTaskUpdated(updatedTask);
            onClose();
        } catch (error) {
            console.error("Помилка при оновленні завдання:", error);
            alert("Не вдалося оновити завдання");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Ти впевнений, що хочеш видалити це завдання?")) return;
        try {
            await taskService.delete(task._id);
            onTaskDeleted(task._id);
            onClose();
        } catch (error) {
            console.error("Помилка при видаленні:", error);
            alert("Не вдалося видалити завдання");
        }
    };

    return (
        <div className="modal-window">
            <div className="modal__content prisma-bg">
                <span className="close-btn--modal" onClick={onClose}>&times;</span>
                <h3 className="form-title">Редагувати завдання</h3>

                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="edit-title">Назва завдання *</label>
                        <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-description">Опис</label>
                        <textarea id="edit-description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="edit-status">Статус</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'in_progress' | 'completed')}>
                                <option value="pending">Очікує</option>
                                <option value="in_progress">В процесі</option>
                                <option value="completed">Завершено</option>
                            </select>
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="edit-priority">Пріоритет</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
                                <option value="low">Низький</option>
                                <option value="medium">Середній</option>
                                <option value="high">Високий</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-dueDate">Дата виконання</label>
                        <input type="date" id="edit-dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>

                    <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={handleDelete} className="btn-submit" style={{ backgroundColor: '#eb5757', flex: 1 }}>
                            Видалити
                        </button>
                        <button type="submit" className={`btn-submit gradient-${theme}--horizontal`} style={{ flex: 2 }}>
                            Зберегти зміни
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditForm;