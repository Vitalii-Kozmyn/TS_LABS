import type { ITask } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/block.css';

interface TasksListProps {
    tasks: ITask[];
    onTaskClick: (task: ITask) => void;
}

function TasksList({ tasks, onTaskClick }: TasksListProps) {
    const { theme } = useTheme();

    const getPriorityClass = (priority: string) => {
        if (priority === 'high') return 'hp-block';
        if (priority === 'low') return 'lp-block';
        return 'mp-block'; 
    };

    const unassignedTasks = tasks.filter(task => !task.dueDate);

    return (
        <div className={`tasks__container gradient-${theme}--linear`}>
            <div className="tasks__container--2 prisma-bg">
                <div className="tasks__container--blank">
                    {unassignedTasks.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#a8b2d1', marginTop: '20px' }}>
                            Всі завдання розплановані
                        </div>
                    ) : (
                        unassignedTasks.map(task => (
                            <div 
                                key={task._id} 
                                className={`task-card click-element ${getPriorityClass(task.priority)}`}
                                draggable 
                                onDragStart={(e) => { 
                                    e.dataTransfer.setData('taskId', task._id); 
                                }}
                                onClick={() => onTaskClick(task)}
                            >
                                <div 
                                    className={`status-indicator status-indicator--list ${
                                        task.status === 'completed' ? 'status--completed' : 'status--pending'
                                    }`}
                                    title={task.status === 'completed' ? 'Завершено' : 'В процесі / Очікує'}
                                />
                                <h4 style={{ margin: 0, padding: '0 20px' }}>{task.title}</h4>
                                {task.description && (
                                    <p style={{ fontSize: '12px', opacity: 0.8, margin: '5px 0 0' }}>
                                        {task.description}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default TasksList;