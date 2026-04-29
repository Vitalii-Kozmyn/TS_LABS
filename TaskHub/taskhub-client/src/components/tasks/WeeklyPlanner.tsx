import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/weeklyPlanner.css';
import '../../styles/block.css';
import type { ITask } from '../../types/task';

interface WeeklyPlannerProps {
    tasks: ITask[];
    onTaskDrop: (taskId: string, date: string) => void;
    onTaskClick: (task: ITask) => void;
}

function WeeklyPlanner({ tasks, onTaskDrop, onTaskClick }: WeeklyPlannerProps) {
    const { theme } = useTheme();
    const [startOfWeek, setStartOfWeek] = useState<Date>(() => {
        const initialDate = new Date(2026, 2, 18); 
        const day = initialDate.getDay();
        const diff = initialDate.getDate() - day + (day === 0 ? -6 : 1); 
        initialDate.setDate(diff);
        return initialDate;
    });

    const handlePrevWeek = () => {
        const newDate = new Date(startOfWeek);
        newDate.setDate(newDate.getDate() - 7);
        setStartOfWeek(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(startOfWeek);
        newDate.setDate(newDate.getDate() + 7);
        setStartOfWeek(newDate);
    };

    const weekDays = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + index);
        return date;
    });

    const formatDayHeader = (date: Date) => {
        const days = ['Нд.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
        const dayName = days[date.getDay()];
        const dayOfMonth = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${dayName} ${dayOfMonth}.${month}`;
    };

    const formatDateRange = () => {
        const endOfWeek = weekDays[6];
        const formatStr = (d: Date) => {
            const dd = d.getDate().toString().padStart(2, '0');
            const mm = (d.getMonth() + 1).toString().padStart(2, '0');
            const yy = d.getFullYear().toString().slice(2);
            return `${dd}.${mm}.${yy}`;
        };
        return `${formatStr(startOfWeek)} - ${formatStr(endOfWeek)}`;
    };

    const isSameDay = (taskDateStr: string | undefined, cellDate: Date) => {
        if (!taskDateStr) return false; 
        const d1 = new Date(taskDateStr);
        return (
            d1.getFullYear() === cellDate.getFullYear() &&
            d1.getMonth() === cellDate.getMonth() &&
            d1.getDate() === cellDate.getDate()
        );
    };

    const getTaskColor = (task: ITask) => {
        switch (task.priority) {
            case 'high': return '#eb5757'; 
            case 'low': return '#6fcf97';  
            case 'medium': 
            default: return '#f2c94c';     
        }
    };

    const formatToYYYYMMDD = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="planner-container">
            <div className="planner-header">
                <h2 className="planner-title">Планування завдань</h2>
                <div className="planner-navigation">
                    <button className={`nav-btn gradient-${theme}--horizontal`} onClick={handlePrevWeek}>{'<'}</button>
                    <span className="date-range">{formatDateRange()}</span>
                    <button className={`nav-btn gradient-${theme}--horizontal`} onClick={handleNextWeek}>{'>'}</button>
                </div>
            </div>

            <div className={`planner-grid ${theme}-border`}>
                <div className="grid-header">
                    {weekDays.map((date, index) => (
                        <div key={index} className="grid-cell header-cell">{formatDayHeader(date)}</div>
                    ))}
                </div>

                <div className="grid-body">
                    {weekDays.map((date, index) => (
                        <div 
                            key={index} 
                            className="grid-cell body-cell"
                            onDragOver={(e) => e.preventDefault()} 
                            onDrop={(e) => {
                                e.preventDefault();
                                const taskId = e.dataTransfer.getData('taskId');
                                if (taskId) {
                                    onTaskDrop(taskId, formatToYYYYMMDD(date)); 
                                }
                            }}
                        >
                            {tasks
                                .filter(task => isSameDay(task.dueDate, date))
                                .map(task => (
                                    <div 
                                        key={task._id} 
                                        className="task-card click-element" 
                                        style={{ backgroundColor: getTaskColor(task) }}
                                        onClick={() => onTaskClick(task)} 
                                        draggable 
                                        onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}
                                    >
                                        <div 
                                            className={`status-indicator status-indicator--planner ${task.status === 'completed' ? 'status--completed' : 'status--pending'}`}
                                            title={task.status === 'completed' ? 'Завершено' : 'В процесі / Очікує'}
                                        />
                                        <span style={{ padding: '0 15px', display: 'block' }}>{task.title}</span>
                                    </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeeklyPlanner;