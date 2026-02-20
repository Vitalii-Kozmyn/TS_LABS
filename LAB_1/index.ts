console.log(
  "+---------------+----------------------------------------------------+"
);
console.log(
  "|  Позначення   |                    Що позначає                     |"
);
console.log(
  "+---------------+----------------------------------------------------+"
);
console.log(
  "|      leg      |                        катет                       |"
);
console.log(
  "+---------------+----------------------------------------------------+"
);
console.log(
  "|  hypotenuse   |                     гіпотенуза                     |"
);
console.log(
  "+---------------+----------------------------------------------------+"
);
console.log(
  "|adjacent angle |              прилеглий до катета кут               |"
);
console.log(
  "+---------------+----------------------------------------------------+"
);
console.log(
  "|opposite angle |            протилежний до катета кут               |"
);
console.log(
  "+---------------+----------------------------------------------------+"
);
console.log(
  "|     angle     | один з двох гострих кутів (коли задана гіпотенуза) |"
);
console.log(
  "+---------------+----------------------------------------------------+"
);

function convertRadiansToDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

function convertDegreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

function triangle(arg1: number, type1: string, arg2: number, type2: string) {
  let goodRes: string = "success";
  let badRes: string = "failed";

  if (typeof arg1 !== "number" || typeof arg2 !== "number") {
    console.log("Введені аргументи повинні бути числами.");
    return badRes;
  }

  const EPSILON: number = 1e-10;
  if (Math.abs(arg1) < EPSILON || Math.abs(arg2) < EPSILON) {
    console.log("Значення занадто малі для точних обчислень.");
    return badRes;
  }

  const MAX_VALUE: number = 1e10;
  if (Math.abs(arg1) > MAX_VALUE || Math.abs(arg2) > MAX_VALUE) {
    console.log("Значення занадто великі для точних обчислень.");
    return badRes;
  }

  if ((type1 === "leg" || type1 === "hypotenuse") && arg1 <= 0) {
    console.log("Сторони трикутника повинні бути додатними числами.");
    return badRes;
  }
  if ((type2 === "leg" || type2 === "hypotenuse") && arg2 <= 0) {
    console.log("Сторони трикутника повинні бути додатними числами.");
    return badRes;
  }

  let a: number, b: number, c: number, alpha: number, beta: number;
  let alphaRad: number, betaRad: number;

  if (type1 === "leg" && type2 === "leg") {
    a = arg1;
    b = arg2;
    c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    alphaRad = Math.atan(a / b);
    betaRad = Math.atan(b / a);
    alpha = convertRadiansToDegrees(alphaRad);
    beta = convertRadiansToDegrees(betaRad);
  } else if (type1 === "leg" && type2 === "hypotenuse") {
    a = arg1;
    c = arg2;
    
    if (a >= c) {
      console.log("Катет не може бути більшим або рівним гіпотенузі");
      return badRes;
    }
    
    b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    alphaRad = Math.asin(a / c);
    betaRad = Math.acos(a / c);
    alpha = convertRadiansToDegrees(alphaRad);
    beta = convertRadiansToDegrees(betaRad);
  } else if (type1 === "hypotenuse" && type2 === "leg") {
    c = arg1;
    a = arg2;
    
    if (a >= c) {
      console.log("Катет не може бути більшим або рівним гіпотенузі");
      return badRes;
    }
    
    b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    alphaRad = Math.asin(a / c);
    betaRad = Math.acos(a / c);
    alpha = convertRadiansToDegrees(alphaRad);
    beta = convertRadiansToDegrees(betaRad);
  } else if (type1 === "leg" && type2 === "adjacent angle") {
    b = arg1;
    alpha = arg2;
    
    if (alpha <= 0 || alpha >= 90) {
      console.log("Прилеглий кут повинен бути більше 0 і менше 90 градусів.");
      return badRes;
    }
    
    alphaRad = convertDegreesToRadians(alpha);
    beta = 90 - alpha;
    a = b * Math.tan(alphaRad);
    c = b / Math.cos(alphaRad);
  } else if (type1 === "adjacent angle" && type2 === "leg") {
    alpha = arg1;
    b = arg2;
    
    if (alpha <= 0 || alpha >= 90) {
      console.log("Прилеглий кут повинен бути більше 0 і менше 90 градусів.");
      return badRes;
    }
    
    alphaRad = convertDegreesToRadians(alpha);
    beta = 90 - alpha;
    a = b * Math.tan(alphaRad);
    c = b / Math.cos(alphaRad);
  } else if (type1 === "leg" && type2 === "opposite angle") {
    a = arg1;
    alpha = arg2;
    
    if (alpha <= 0 || alpha >= 90) {
      console.log("Протилежний кут повинен бути більше 0 і менше 90 градусів.");
      return badRes;
    }
    
    alphaRad = convertDegreesToRadians(alpha);
    beta = 90 - alpha;
    b = a / Math.tan(alphaRad);
    c = a / Math.sin(alphaRad);
  } else if (type1 === "opposite angle" && type2 === "leg") {
    alpha = arg1;
    a = arg2;
    
    if (alpha <= 0 || alpha >= 90) {
      console.log("Протилежний кут повинен бути більше 0 і менше 90 градусів.");
      return badRes;
    }
    
    alphaRad = convertDegreesToRadians(alpha);
    beta = 90 - alpha;
    b = a / Math.tan(alphaRad);
    c = a / Math.sin(alphaRad);
  } else if (type1 === "hypotenuse" && type2 === "angle") {
    c = arg1;
    alpha = arg2;
    
    if (alpha <= 0 || alpha >= 90) {
      console.log("Кут повинен бути більше 0 і менше 90 градусів.");
      return badRes;
    }
    
    alphaRad = convertDegreesToRadians(alpha);
    beta = 90 - alpha;
    a = c * Math.sin(alphaRad);
    b = c * Math.cos(alphaRad);
  } else if (type1 === "angle" && type2 === "hypotenuse") {
    alpha = arg1;
    c = arg2;
    
    if (alpha <= 0 || alpha >= 90) {
      console.log("Кут повинен бути більше 0 і менше 90 градусів.");
      return badRes;
    }
    
    alphaRad = convertDegreesToRadians(alpha);
    beta = 90 - alpha;
    a = c * Math.sin(alphaRad);
    b = c * Math.cos(alphaRad);
  } else {
    console.log("Непідтримувана комбінація типів: " + type1 + " і " + type2);
    console.log(
      "Перечитайте інструкцію і перевірте правильність введення даних."
    );
    return badRes;
  }

  if (alpha >= 90 || beta >= 90) {
    console.log("Кут не може бути тупим (повинен бути < 90°). Введіть коректні дані.");
    return badRes;
  }

  console.log("Результати: ");
  console.log("a = " + a);
  console.log("b = " + b);
  console.log("c = " + c);
  console.log("alpha = " + alpha);
  console.log("beta = " + beta);

  return goodRes;
}

// Приклади виклику функції
triangle(3, "leg", 4, "leg");
triangle(7, "leg", 18, "hypotenuse");
triangle(18, "hypotenuse", 7, "leg");
triangle(5, "leg", 30, "adjacent angle");
triangle(30, "adjacent angle", 5, "leg");
triangle(60, "leg", 5, "opposite angle");
triangle(60, "opposite angle", 5, "leg");
triangle(15, "hypotenuse", 30, "angle");
triangle(43.13, "angle", -2, "hypotenuse");



// console.log("===== Тестування функції triangle() =====");

// // 1. Тест на тупий кут (повинно вивести помилку)
// console.log("\nТест 1: Тупий кут");
// triangle(10, "hypotenuse", 100, "angle"); // Неправильний випадок

// // 2. Тест на катет, більший за гіпотенузу (повинно вивести помилку)
// console.log("\nТест 2: Катет більший за гіпотенузу");
// triangle(10, "leg", 5, "hypotenuse"); // Помилка, бо 10 > 5

// // 3. Тест на дуже малі значення (повинно вивести помилку)
// console.log("\nТест 3: Дуже малі значення");
// triangle(1e-15, "leg", 1e-15, "leg"); // Числа надто малі для точних обчислень

// // 4. Тест на дуже великі значення (повинно вивести помилку)
// console.log("\nТест 4: Дуже великі значення");
// triangle(1e12, "leg", 1e12, "leg"); // Числа надто великі для точних обчислень

// // 5. Єгипетський трикутник (3-4-5) (перевірка правильності обчислень)
// console.log("\nТест 5: Єгипетський трикутник (3-4-5)");
// triangle(3, "leg", 4, "leg"); // Повинно повернути гіпотенузу 5 та правильні кути

// // 6. Перевірка для прямого кута 45° (катет-кут)
// console.log("\nТест 6: Катет 10 і прилеглий кут 45°");
// triangle(10, "leg", 45, "adjacent angle"); // a = b, гіпотенуза = 10√2 ≈ 14.14

// // // 7. Тест на нечислові значення (повинно вивести помилку)
// // console.log("\nТест 7: Нечислові значення");
// // triangle("abc", "leg", 10, "leg"); // Некоректний ввід

// // 8. Тест на випадок, коли вводяться однакові катети (перевірка рівнобедреного трикутника)
// console.log("\nТест 8: Рівнобедрений трикутник (7-7)");
// triangle(7, "leg", 7, "leg"); // Гіпотенуза повинна бути 7√2 ≈ 9.9

// 9. Тест, коли вводиться гіпотенуза та гострий кут (перевірка обчислення катетів)
// console.log("\nТест 9: Гіпотенуза 13, кут 30°");
// triangle(13, "hypotenuse", 30, "angle"); // Катети повинні бути 6.5 та 11.26

// // 10. Тест на нульові або від’ємні значення (повинно вивести помилку)
// console.log("\nТест 10: Нульове або від'ємне значення");
// triangle(-5, "leg", 10, "leg"); // Помилка
// triangle(0, "leg", 10, "leg"); // Помилка


(window as any).triangle = triangle;