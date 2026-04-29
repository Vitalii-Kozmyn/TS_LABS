import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { ITask } from '../../types/task';
import '../../styles/calendar.css'

const MONTH_NAMES = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
];

const WEEK_DAYS = ['Пн', 'Вв', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

interface CalendarProps {
    tasks: ITask[];
}

function Calendar({ tasks }: CalendarProps) {
    const { theme } = useTheme();
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => `blank-${i}`);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    function handlePrevMonth() {
        setCurrentDate(new Date(year, month - 1, 1));
    }

    function handleNextMonth() {
        setCurrentDate(new Date(year, month + 1, 1));
    }

    const getTaskCountForDate = (day: number) => {
        const targetDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            const taskDate = task.dueDate.split('T')[0];
            return taskDate === targetDateStr;
        }).length;
    };

    const getDayStyle = (day: number) => {
        const count = getTaskCountForDate(day);
        if (count === 0) return {};

        const alpha = Math.min(0.4 + (count * 0.2), 1);
        const glowRadius = count * 4;
        
        return {
            border: `2px solid rgba(242, 201, 76, ${alpha})`,
            boxShadow: `inset 0 0 ${glowRadius}px rgba(242, 201, 76, ${alpha})`,
            borderRadius: '8px',
            fontWeight: 'bold'
        };
    };

    return (
        <div className="prisma-bg calendar__block">
            <div className="calendar-header">
                <button className={`nav-btn gradient-${theme}--horizontal arrow-btn click-element`} onClick={handlePrevMonth}>
                    {'<'}
                </button>

                <h2 className="calendar-title">
                    {MONTH_NAMES[month]} {year}
                </h2>

                <button className={`nav-btn gradient-${theme}--horizontal arrow-btn click-element`} onClick={handleNextMonth}>
                    {'>'}
                </button>
            </div>

            <div className="calendar-week">
                {WEEK_DAYS.map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {blanks.map(blank => (
                    <div key={blank} className="calendar-blank"></div>
                ))}

                {days.map(day => {
                    return (
                        <div
                            key={day}
                            className={`calendar-day click-element`}
                            style={getDayStyle(day)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;