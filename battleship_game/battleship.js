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

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");
// view.displayMessage("Tap tap, is this thing on?");

model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");