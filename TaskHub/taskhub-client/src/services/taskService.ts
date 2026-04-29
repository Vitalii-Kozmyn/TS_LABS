import api from './api';
import type { ITask } from '../types/task';

export const taskService = {
    getAll: async () => {
        // Звертається до http://localhost:.../api/tasks/all
        const response = await api.get<ITask[]>('/tasks/all');
        return response.data;
    },
    create: async (taskData: Partial<ITask>) => {
        // Звертається до http://localhost:.../api/tasks/add
        const response = await api.post<ITask>('/tasks/add', taskData);
        return response.data;
    },
    update: async (id: string, taskData: Partial<ITask>) => {
        // Звертається до http://localhost:.../api/tasks/edit/123
        const response = await api.put<ITask>(`/tasks/edit/${id}`, taskData);
        return response.data;
    },
    delete: async (id: string) => {
        // Звертається до http://localhost:.../api/tasks/delete/123
        const response = await api.delete(`/tasks/delete/${id}`);
        return response.data;
    }
};