var scores = [60, 50, 60, 58, 54, 54,
			  58, 50, 52, 54, 48, 69,
			  34, 55, 51, 52, 44, 51,
			  69, 64, 66, 55, 52, 61,
			  46, 31, 57, 52, 44, 18,
			  41, 53, 55, 61, 51, 44];

var costs = [.25, .27, .25, .25, .25, .25,
			 .33, .31, .25, .29, .27, .22,
			 .31, .25, .25, .33, .21, .25,
			 .25, .25, .28, .25, .24, .22,
			 .20, .25, .30, .25, .24, .25,
			 .25, .25, .27, .25, .26, .29];

function printAndGetHighScore(scores) {
	var highScore = 0,
		output;

	for (var i = 0; i < scores.length; i++) {
		output = 'Bubble solution #' + i + ' score: ' + scores[i];
		console.log(output);

		if (scores[i] > highScore) {
			highScore = scores[i];
		}
	}
	return highScore;
}

function  getBestResults(score, highScore) {
	var bestSolutions = [];

	for (var i = 0; i < scores.length; i++) {
		if (scores[i] == highScore) {
			// bestSolutions[bestSolutions.length] = i;
			bestSolutions.push(i);
		}
	}
	return bestSolutions;
}

function getMostCostEffectiveSolution(scores, costs, highScore) {
	var cost = 100,
		index;

	for (var i = 0; i < scores.length; i++) {
		if (scores[i] == highScore) {
			if (cost > costs[i]) {
				index = i;
				cost = costs[i];
			}
		}
	}
	return index;
}

var highScore = printAndGetHighScore(scores);
console.log('Bubbles tests: ' + scores.length);
console.log('Highest bubble score: ' + highScore);

var bestSolutions = getBestResults(scores, highScore);
console.log('Solutions with highest score: ' + bestSolutions);

var mostCostEffective = getMostCostEffectiveSolution(scores, costs, highScore);
console.log("Bubble Solution #" + mostCostEffective + " is the most cost effective");

/*
--== ОБРАЗЕЦ #11 ==--

- 2/3 стакана средства для мытья посуды
- 3,5 литра воды
- 2-3 столовые ложки глицерина (продается в аптеках)

Инструкция: Смешать ингредиенты в большой миске и развлекаться!
*/