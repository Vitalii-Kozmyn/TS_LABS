import type { ITask } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/progress.css'

interface ProgressProps {
    tasks: ITask[];
}

function TasksProgress({ tasks }: ProgressProps) {
    const { theme } = useTheme();

    const calculateProgress = (priority: 'high' | 'medium' | 'low') => {
        const priorityTasks = tasks.filter(t => t.priority === priority);
        if (priorityTasks.length === 0) return 0;
        const completedTasks = priorityTasks.filter(t => t.status === 'completed');
        return Math.round((completedTasks.length / priorityTasks.length) * 100);
    };

    const high = calculateProgress('high');
    const medium = calculateProgress('medium');
    const low = calculateProgress('low');

    return (
        <div className={`progress__container gradient-${theme}--horizontal`}>
            <div className="progress__container--2 prisma-bg">
                <div className="progress__container--blank">
                    <h2>Ваш прогрес виконання</h2>

                    <div className="progress__block-high">
                        <div 
                            className="progress__fill--h"
                            style={{ width: `${high}%`, transition: 'width 0.5s ease-in-out' }}
                        />
                        <span className="progress__percent">{high}%</span>
                    </div>

                    <div className="progress__block-medium">
                        <div 
                            className="progress__fill--m"
                            style={{ width: `${medium}%`, transition: 'width 0.5s ease-in-out' }}
                        />
                        <span className="progress__percent">{medium}%</span>
                    </div>

                    <div className="progress__block-lov">
                        <div 
                            className="progress__fill--l"
                            style={{ width: `${low}%`, transition: 'width 0.5s ease-in-out' }}
                        />
                        <span className="progress__percent">{low}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksProgress;