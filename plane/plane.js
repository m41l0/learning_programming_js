var passengers = [
    {name: 'Jane Doloop', paid: true, ticket: 'coach'},
    {name: 'Dr. Evel', paid: true, ticket: 'supercoach'},
    {name: 'Sue Property', paid: false, ticket: 'firstclass'},
    {name: 'John Funcall', paid: true, ticket: 'coach'}];

// проверка на присутствие в черном списке
function checkNoFlyList(passenger) {
    return (passenger.name === 'Dr. Evel');
}

// проверка оплаты билетов
function checkNotPaid(passenger) {
    return (!passenger.paid);
}

// функция для общей проверки, принимающая другую функцию в аргумент
function processPassengers(passengers, testFunction) {
    for (var i = 0; i < passengers.length; i++) {
        if (testFunction(passengers[i])) {
            return false;
        }
    }
    return true;
}

// вывод списка пассажиров
function printPassenger(passenger) {
    var message = passenger.name;
    if (passenger.paid === true) {
        message = message + ' has paid';
    } else {
        message = message + ' has not paid';
    }
    console.log(message);
    return false;
}

// обслуживание клиентов
function serveCustomer(passenger) {
    var getDrinkOrderFunction = createDrinkOrder(passenger);
    var getDinnerOrderFunction = createDinnerOrderFunction(passenger);

    // console.log('get - ' + getDrinkOrderFunction);
    // console.log('create - ' + createDrinkOrder);

    getDrinkOrderFunction();
    // пердолжить обед
    getDrinkOrderFunction();
    getDinnerOrderFunction();
    getDrinkOrderFunction();
    // включить кино
    getDrinkOrderFunction();
    // забрать мусор
}

// перебираем пассажиров в массиве passengers и вызываем serveCustomer для каждого пассажира
function servePassengers(passengers) {
    for (var i = 0; i < passengers.length; i++) {
        serveCustomer(passengers[i]);
    }
}

// заказ напитков
function createDrinkOrder(passenger) {
    // cоздаем переменную для хранения функции, которую мы возвращаем
    var orderFunction;

    if (passenger.ticket === 'firstclass') {
        orderFunction = function() {
            alert('Would you like a cocktail or wine?');
        }
    } else if (passenger.ticket === 'coach') {
        orderFunction = function() {
            alert('Your choice is cola or water.');
        }
    } else {
        orderFunction = function() {
            alert('Your choice is cola, water or wine.');
        }
    }
    return orderFunction;
}

// заказ обеда
function createDinnerOrderFunction(passenger) {
    // cоздаем переменную для хранения функции, которую мы возвращаем
    var orderFunction;

    if (passenger.ticket === 'firstclass') {
        orderFunction = function() {
            alert('Would you like a chicken or pasta?');
        }
    } else if (passenger.ticket === 'coach') {
        orderFunction = function() {
            alert('Your choice is nuts or crackers.');
        }
    } else {
        orderFunction = function() {
            alert('Your choice is snacks or cheese plate.');
        }
    }
    return orderFunction;
}

var allCanFly = processPassengers(passengers, checkNoFlyList);
if (!allCanFly) {
    console.log("The plane can't take off: we have a passenger on the no-fly-list.");
}

var allPaid = processPassengers(passengers, checkNotPaid);
if (!allPaid) {
    console.log("The plane can't take off: not everyone has paid.");
}

processPassengers(passengers, printPassenger);

servePassengers(passengers);