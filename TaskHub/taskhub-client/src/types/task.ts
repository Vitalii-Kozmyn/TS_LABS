export interface ITask {
    _id: string;
    title: string;
    description: string;
    
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';

    dueDate?: string; 
    completedAt?: string;
    
    user: string;
    
    createdAt: string;
    updatedAt: string;
}

export interface ICreateTaskData {
    title: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
}