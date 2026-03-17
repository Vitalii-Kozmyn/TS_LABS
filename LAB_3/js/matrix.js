const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Встановлюємо розмір на весь екран
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Символи Матриці
const chars = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF";
const charArray = chars.split("");

const fontSize = 16;
const columns = canvas.width / fontSize; // Кількість колонок

// Масив для відстеження координати Y для кожної колонки
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1; 
}

function draw() {
    // Напівпрозорий чорний фон, щоб створювати ефект "хвоста" (trail)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Зелений колір тексту
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        // Вибираємо випадковий символ
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Малюємо символ: x = позиція колонки, y = значення з масиву drops
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Якщо крапля досягла низу екрана, скидаємо її на початок з випадковою затримкою
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Запускаємо анімацію
setInterval(draw, 33);