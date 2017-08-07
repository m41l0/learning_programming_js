/*
function makeTimer(doneMessage, n) {
    setTimeout(function () {
        alert(doneMessage);
    }, n);
}

makeTimer('Cookies are done!', 1000);
*/


function setTimer(doneMessage, n) {
    // здесь замыкание
    setTimeout(function () {
        alert(doneMessage);
    }, n);

    // значение doneMessage меняется после вызова setTimeout
    doneMessage = 'OUCH!';
}

setTimer('Cookies are done!', 1000); // выведет 'OUCH!', т.к. замыкание содержит непосредственно окружение, а не его копию