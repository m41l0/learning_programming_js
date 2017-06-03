var passengers = [ {name: 'Jane Doloop', paid: true},
                   {name: 'Dr. Evel', paid: true},
                   {name: 'Sue Property', paid: false},
                   {name: 'John Funcall', paid: true} ];


// функция провекри оплаты билетов
function checkPaid(passengers) {
    for (var i = 0; i < passengers.length; i++) {
        if (!passengers[i].paid) {
            return false;
        }
    }
    return true;
}

// функция провекри на присутствие в черном списке
function checkNoFly(passengers) {
    for (var i = 0; i < passengers.length; i++) {
        if (onNoFlyList(passengers[i]).name) {
            return false;
        }
    }
    return true;
}

// функция вывода списка пассажиров
function printPassengers(passengers) {
    for (var i = 0; i < passengers.length; i++) {
        console.log(passengers[i].name);
        return false;
    }
    return true;
}