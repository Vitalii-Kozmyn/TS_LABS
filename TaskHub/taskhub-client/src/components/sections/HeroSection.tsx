import { useState, useEffect } from 'react';
import HeroNav from "../layout/HeroNav";
import WeeklyPlanner from "../tasks/WeeklyPlanner";
import TasksList from "../tasks/TasksList";
import AddButton from "../ui/AddButton";
import CreateForm from "../layout/CreateForm";
import EditForm from "../layout/EditForm";
import { taskService } from "../../services/taskService";
import type { ITask } from "../../types/task";

function HeroSection() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [editingTask, setEditingTask] = useState<ITask | null>(null);

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

    const handleTaskCreated = (newTask: ITask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask: ITask) => {
        setTasks(prevTasks => prevTasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    };

    const handleTaskDeleted = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
    };

    const handleTaskDrop = async (taskId: string, newDate: string) => {
        try {
            const updatedTask = await taskService.update(taskId, { dueDate: newDate });
            handleTaskUpdated(updatedTask);
        } catch (error) {
            console.error("Помилка при перетягуванні:", error);
        }
    };

    return (
        <section className="hero-section">
            <HeroNav />
            <div className="task-plan__container">
                <WeeklyPlanner 
                    tasks={tasks} 
                    onTaskDrop={handleTaskDrop}
                    onTaskClick={setEditingTask} 
                />
                
                <div className="planner__container-list">
                    <h2 className="list-title">Завдання</h2>
                    <TasksList tasks={tasks} onTaskClick={setEditingTask} />
                    <AddButton onClick={() => setIsCreateOpen(true)} />
                </div>
            </div>

            {isCreateOpen && (
                <CreateForm onClose={() => setIsCreateOpen(false)} onTaskCreated={handleTaskCreated} />
            )}

            {editingTask && (
                <EditForm 
                    task={editingTask} 
                    onClose={() => setEditingTask(null)} 
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                />
            )}
        </section>
    );
}

export default HeroSection;
