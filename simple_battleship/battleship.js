var location1 = 3,
	location2 = 4,
	location3 = 5,
	guess,
	hits = 0,
	guesses = 0,
	isSunk = false;

while (isSunk == false) { // пока корабль не потоплен
	guess = prompt('Ready, aim, fire! (enter a number 0 - 6):');
	if (guess < 0 || guess > 6) { // проверяем предположение пользователя
		alert('Please enter a valid cell number!');
	} else {
		guesses++; // если введенное значение корректно, увеличиваем счетчик попыток

		if (guess == location1 || guess == location2 || guess == location3) {
			alert('HIT!');
			hits++; // если есть попадание, то увеличиваем счетчик попаданий

			if (hits == 3) {
				isSunk = true;
				alert('You sunk my simple_battleship!');
			}
		} else {
			alert('MISS!');
		}
	}
}

var stats = 'You took ' + guesses + ' guesses to sink the simple_battleship, ' + 'wich means your shooting accuracy was ' + (3/guesses);
alert(stats); // выводим статистику