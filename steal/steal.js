var balance = 10500;
var cameraOn = true;

function steal(balance, amount) { // глобальная переменная balance замещается параметром balance
	cameraOn = false;
	if (amount < balance) {
		balance = balance - amount;
	}
	return amount;
	cameraOn = true; // камеру забыл включить обратно
}

var amount = steal(balance, 1250);
console.log(balance);
console.log(cameraOn);
console.log('Criminal: you stole ' + amount + '!');


// правильная функция для кражи
function fixedSteal(oldBalance, amount) { // глобальная переменная balance замещается параметром balance
	cameraOn = false;
	if (amount < oldBalance) {
		balance = oldBalance - amount;
	}
	cameraOn = true;
	return amount;
}

var amount = fixedSteal(balance, 1250);
console.log(balance);
console.log(cameraOn);
console.log('Criminal: you stole ' + amount + '!');