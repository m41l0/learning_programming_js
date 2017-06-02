var passengers = [
    {name: 'Jane Doloop', paid: true},
    {name: 'Dr. Evel', paid: true},
    {name: 'Sue Property', paid: false},
    {name: 'John Funcall', paid: true}];

// функция провекри на присутствие в черном списке
function checkNoFlyList(passenger) {
    return (passenger.name === 'Dr. Evel');
}

// функция провекри оплаты билетов
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

// функция вывода списка пассажиров
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

var allCanFly = processPassengers(passengers, checkNoFlyList);
if (!allCanFly) {
    console.log("The plane can't take off: we have a passenger on the no-fly-list.");
}

var allPaid = processPassengers(passengers, checkNotPaid);
if (!allPaid) {
    console.log("The plane can't take off: not everyone has paid.");
}

processPassengers(passengers, printPassenger);