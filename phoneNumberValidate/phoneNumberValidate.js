/**
 * Check if a phone number is like '123-4567'
 * @param phoneNumber
 * @returns {boolean}
 */
function validate(phoneNumber) {
    if (phoneNumber.length > 8 || phoneNumber.length < 7) {
        return false;
    }

    var first = phoneNumber.substring(0, 3);
    var second = phoneNumber.substring(phoneNumber.length - 4);

    if (isNaN(first) || isNaN(second)) {
        return false;
    }

    if (phoneNumber.length === 8) {
        return (phoneNumber.charAt(3) === '-');
    }
    return true;
}

function validate2(phoneNumber) {
    return phoneNumber.match(/^\d{3}-?\d{4}$/);
}

res1 = validate('123-4567');
res2 = validate('1234567');
res3 = validate('1234567-');

console.log(res1);
console.log(res2);
console.log(res3);