import { Router } from "express";
import { 
    createTask, 
    editTask, 
    deleteTask, 
    getTasksByUserId 
} from "../controllers/taskController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router();

router.get("/all", checkAuth, getTasksByUserId);
router.post("/add", checkAuth, createTask);
router.put("/edit/:id", checkAuth, editTask);
router.delete("/delete/:id", checkAuth, deleteTask);

export default router;