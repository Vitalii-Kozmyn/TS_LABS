import cron from 'node-cron';
import Task from '../model/task.js';
import { sendDailyTasksEmail } from './emailService.js';

export const startCronJobs = () => {
    cron.schedule('0 8 * * *', async () => {
        console.log('⏰ Запуск перевірки завдань для розсилки (08:00)...');
        
        try {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(startOfDay);
            endOfDay.setDate(endOfDay.getDate() + 1);

            const todayTasks = await Task.find({
                dueDate: { $gte: startOfDay, $lt: endOfDay },
                status: { $ne: 'completed' }
            }).populate('user', 'email');

            if (todayTasks.length === 0) {
                console.log('ℹ️ На сьогодні немає запланованих завдань.');
                return;
            }

            const userTasksMap = new Map<string, any[]>();

            todayTasks.forEach(task => {
                const user = task.user as any;
                if (user && user.email) {
                    if (!userTasksMap.has(user.email)) {
                        userTasksMap.set(user.email, []);
                    }
                    userTasksMap.get(user.email)?.push(task);
                }
            });

            for (const [email, tasks] of userTasksMap.entries()) {
                await sendDailyTasksEmail(email, tasks);
                console.log(`✅ Відправлено список завдань на ${email}`);
            }

        } catch (error) {
            console.error('❌ Помилка під час виконання cron-задачі:', error);
        }
    });
};