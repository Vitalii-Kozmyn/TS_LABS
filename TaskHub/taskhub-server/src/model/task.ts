import mongoose, { Schema, type Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate?: Date;
    completedAt?: Date;
    user: mongoose.Types.ObjectId;
}

const taskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending",
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },

    dueDate: {
        type: Date,
    },

    completedAt: {
        type: Date,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    }, {
    timestamps: true,
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;