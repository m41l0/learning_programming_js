/**
 * объект представления
 * @type {{displayMessage: view.displayMessage, displayHit: view.displayHit, displayMiss: view.displayMiss}}
 */
var view = {
    /**
     * Метод для вывода сообщения пользователю
     * @param msg
     */
    displayMessage: function (msg) {
        var messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    /**
     * метод отрисовывания попадания на игровом поле
     * @param location
     */
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    /**
     * метод отрисовывания промаха на игровом поле
     * @param location
     */
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }
};

/**
 * объект модели
 * @type {{boardSize: number, numShips: number, shipsSunk: number, shipLength: number, ships: [*], fire: model.fire}}
 */
var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    ships: [{locations: ['06', '16', '26'], hits: ['', '', '']}, // 1-й корабль
            {locations: ['24', '34', '44'], hits: ['', '', '']}, // 2-й корабль
            {locations: ['10', '11', '12'], hits: ['', '', '']}], // 3-й корабль
    /**
     * метод для определения попадания в корабль
     * @param guess
     * @returns {boolean}
     */
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            // если координаты клетки присутсивуют в массиве, то выстрел попал в цель
            var index = ship.locations.indexOf(guess);
            // в массиве hits помечаем попадание, значение = index
            if (index >= 0) {
                ship.hits[index] = 'hit';
                // оповещаем представление о том, что нужно пометить маркером попадание в корабль в клетке guess
                view.displayHit(guess);
                // говорим представлению, чтобы нужно вывести сообщение 'HIT!'
                view.displayMessage('HIT!');
                //если корабль потоплен, то увеличиваем счетчик потопленных кораблей в свойстве shipsSunk модели
                if (this.isSunk(ship)) {
                    // приказываем представлению вывести сообщение для игрока, что он потопил корабль
                    view.displayMessage('You sank my battleship!');
                    this.shipsSunk++;
                }
                // истина возвращается, при удачном выстреле
                return true;
            }
        }
        // сообщаем представлению, что нужно вывести маркер промаха в клетке guess
        view.displayMiss(guess);
        // приказываем представлению вывести сообщение о промахе
        view.displayMessage('You missed! Ha-ha!');
        // если после перебора всех кораблей попадание не обнаружено, то игрок промахнулся, а метод возвращает false
        return false;
    },
    /**
     * метод проверки потоплен ли корабль
     * @param ship
     * @returns {boolean}
     */
    isSunk: function (ship) {
        // если есть хотя бы одна клетка, которая не помечена 'hit', то корабль еще не потоплен и возвращаем ложь
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        // если корабль потоплен, то возвращаем истину
        return true;
    }

};

var controller = {
    guesses: 0,
    /**
     * метод processGuess, получающий координаты в формате 'A0'.
     * @param guess
     */
    processGuess: function (guess) {
        // метод parseGuess будет использоваться для проверки введенных данных
        var location = parseGuess(guess);
        // если метод не возвращает null, значит был получен действительный объект location
        if (location) {
            // если полльзователь ввел правильные координаты, то счетчик увеличивается на 1,
            // при вводе недействительных координат, попытка в подсчет не включается
            this.guesses++;
            var hit = model.fire(location);
            // если выстрел попал в цель, а количество потопленных кораблей равно количеству кораблей в игре,
            // выводится сообщение о том, что все корабли потоплены
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
};
/**
 * Вспомогательная функция для проверки введенных значений пользователем
 * @param guess
 * @returns {*}
 */
function parseGuess(guess) {
    // массив заполняется всеми буквами, которые могут присутствовать в действительных координатах
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    // проверяем данные на null и убеждаемся, что в строке два символа
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        // извлекаем первый символ строки
        var firstChar = guess.charAt(0);
        // при помощи метода indexOf получаем цифру в диапазоне от 0 до 6, соответствующую букве
        var row = alphabet.indexOf(firstChar);
        // получаем второй символ, представляющий столбец игрового поля
        var column = guess.charAt(1);

        // при помощи функция isNaN выявляем строки и столбцы, которые не являются цифрами
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) { // проверяем, что цифры лежат в диапазоне от 0 до 6
            alert("Oops, that's off the board!");
        } else {
            // строка и столбец объединяются в строку, а результат возвращается методом
            return row + column;
        }
    }
    // если управление передано в эту точку, значит, какая-то проверка не прошла, и метод возвращает null
    return null;
}

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");
// view.displayMessage("Tap tap, is this thing on?");

// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");

// console.log(parseGuess("A0"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("H0"));
// console.log(parseGuess("A7"));

controller.processGuess("A0");
controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");