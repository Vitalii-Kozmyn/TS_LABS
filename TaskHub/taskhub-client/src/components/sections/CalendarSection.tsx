import { useState, useEffect } from 'react';
import HeroNav from "../layout/HeroNav";
import Calendar from "../ui/Calendar";
import NotificationToggle from "../ui/NotificationToggle";
import TasksProgress from "../tasks/TasksProgress";
import { taskService } from "../../services/taskService";
import type { ITask } from "../../types/task";
import '../../styles/block.css'
import { useTheme } from '../../context/ThemeContext';

function CalendarSection() {
    const [sendNotification, setSendNotification] = useState(false);
    const [tasks, setTasks] = useState<ITask[]>([]);

    const { theme } = useTheme();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskService.getAll();
                setTasks(data);
            } catch (error) {
                console.error("Помилка завантаження завдань", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <section className="calendar-section">
            <HeroNav></HeroNav>
            <div className="calendar__conteiner">
                <div className="calendar__container--1">
                    {/* Передаємо завдання в Календар */}
                    <Calendar tasks={tasks}></Calendar>
                    
                    <div className="settings">
                        <h2>Налаштування</h2>
                        <div className={`check__block gradient-${theme}--horizontal`}>
                            <div className="check__block--content prisma-bg">
                                <NotificationToggle 
                                    checked={sendNotification} 
                                    onChange={setSendNotification} 
                                    label="Надсилати нотифікацію" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="calendar__container--2">
                    {/* Передаємо завдання у Прогрес-бар */}
                    <TasksProgress tasks={tasks}></TasksProgress>
                </div>
            </div>
        </section>
    );
}

export default CalendarSection;