import nodemailer from 'nodemailer';

// Налаштовуємо підключення до Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendDailyTasksEmail = async (email: string, tasks: any[]) => {
    const tasksHtml = tasks.map(task => 
        `<li style="margin-bottom: 10px;">
            <strong>${task.title}</strong> 
            <span style="color: #888; font-size: 12px;">(Пріоритет: ${task.priority})</span>
        </li>`
    ).join('');

    const mailOptions = {
        from: `"TaskHub Planner" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🚀 Твої завдання на сьогодні - TaskHub',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f7f6; border-radius: 10px;">
                <h2 style="color: #333;">Привіт! 👋</h2>
                <p>Ось список завдань, які чекають на тебе сьогодні:</p>
                <ul style="background: #fff; padding: 20px; border-radius: 8px; list-style-type: none;">
                    ${tasksHtml}
                </ul>
                <p style="color: #666; font-size: 14px;">Вдалого та продуктивного дня!</p>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};