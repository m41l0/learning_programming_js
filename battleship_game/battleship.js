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
            var locations = ship.locations;
            // если координаты клетки присутсивуют в массиве, то выстрел попал в цель
            var index = locations.indexOf(guess);
            // в массиве hits помечаем попадание, значение = index
            if (index >= 0) {
                ship.hits[index] = 'hit';
                // истина возвращается, при удачном выстреле
                return true;
            }
        }
        return false;
    }

};

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");
// view.displayMessage("Tap tap, is this thing on?");