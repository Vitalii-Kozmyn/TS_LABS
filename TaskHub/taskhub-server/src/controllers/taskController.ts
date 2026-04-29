import Task, { type ITask } from "../model/task.js";
import { type AuthRequest } from "../middlewares/checkAuth.js"; 
import { type Request, type Response } from "express";
import mongoose from "mongoose";

export async function createTask(req: AuthRequest, res: Response) {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const userId = req.user?.id;

        if(!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTask: ITask = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            user: userId
        });

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ message: "Server error while creating task" });
    }
}

export async function editTask(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid task id" });
        }
        const taskId = new mongoose.Types.ObjectId(id);

        const { title, description, status, priority, dueDate } = req.body;

        const updatedTask: ITask | null = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            {
                $set: {
                    title,
                    description,
                    status,
                    priority,
                    dueDate,
                    ...(status === "completed" && { completedAt: new Date() })
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found or access denied"
            });
        }

        return res.status(200).json(updatedTask);

    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating task"
        });
    }
}

export async function deleteTask(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid task id" });
        }
        
        const taskId = new mongoose.Types.ObjectId(id);

        const task: ITask | null = await Task.findOneAndDelete({_id: taskId, user: userId});

        if(!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        return res.status(201).json({message: 'Task deleted successfully'});
    } catch (error) {
        return res.status(400).json({message: 'Failed to delete the task'});
    }
}

export async function getTasksByUserId(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tasks = await Task.find({ user: userId });

        return res.status(200).json(tasks);
        
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get the tasks' });
    }
}