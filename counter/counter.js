function makeCounter() {
    // переменная count помещается в функцию makeCounter и становится локальной переменной
    var count = 0;

    // создаем функцию counter, которая увеличивает переменную count
    function counter() {
        count++;
        return count;
    }
    // возвращаем, а НЕ вызываем функцию counter
    // это замыкание: значение count сохраняется в его окружении
    return counter;
}

// объявляем переменную doCount и присваиваем ей ссылку на функцию counter(),
// посредством вызова функции makeCounter(), которая и возвращает свою вложенную функцию counter()
var doCount = makeCounter();

console.log(doCount); // function counter()

console.log(doCount());
console.log(doCount());
console.log(doCount());