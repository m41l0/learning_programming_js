let Calendar = function (calendar, input) {
    this.input = input;
    this.calendar = calendar;
    this.date = new Date;
    this._months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    this.monthElement = calendar.getElementsByClassName('calendar-ui__current-month')[0],
    this.yearElement = calendar.getElementsByClassName('calendar-ui__current-year')[0];
    this.datesElement = calendar.getElementsByClassName('calendar-ui__dates')[0];
    this.nextMonthElement = calendar.getElementsByClassName('calendar-ui__month_next')[0];
    this.prevMonthElement = calendar.getElementsByClassName('calendar-ui__month_prev')[0];

    this.daysElements = [];

    this.createDates();
    this.update();
    this.bindEvents();
};

Calendar.prototype.bindEvents = function () {
    this.nextMonthElement.addEventListener('click', e => {
        const date = this.date,
        month = date.getMonth(),
        year = date.getUTCFullYear(),
        day = date.getDate();
    this.date = new Date(year, month + 1, day);
    this.update();
    e.preventDefault();
});

    this.prevMonthElement.addEventListener('click', e => {
        const date = this.date,
        month = date.getMonth(),
        year = date.getUTCFullYear(),
        day = date.getDate();
    this.date = new Date(year, month - 1, day);
    this.update();
    e.preventDefault();
});

    const yearChange = e =>
    {
        const date = this.date,
            month = date.getMonth(),
            year = date.getUTCFullYear();
        this.date = new Date(+this.yearElement.value, month);
        this.update();
        e.preventDefault();
    };
    this.yearElement.addEventListener('change', yearChange);

    this.datesElement.addEventListener('click', e => {
        const date = this.date,
        month = date.getMonth(),
        year = date.getUTCFullYear(),
        beginMonthDate = new Date(year, month, 1),
        day = (day => day ? day - 1 : 6)(beginMonthDate.getDay()),
        index = this.daysElements.indexOf(e.target);

    this.date = new Date(year, month, index - day + 1);
    this.update();
    e.preventDefault();
});
};

Calendar.prototype.createDates = function () {
    this.datesElement.innerHTML = '';
    for (let i = 42; i--;) {
        let dateElement = document.createElement('a');
        dateElement.setAttribute('href', '#');
        dateElement.className = 'calendar-ui__date calendar-ui__date_current-month';

        this.datesElement.appendChild(dateElement);
        this.daysElements.push(dateElement);
    }
};

Calendar.prototype.update = function () {
    const currentDate = this.date,
        month = currentDate.getMonth(),
        year = currentDate.getUTCFullYear(),
        date = new Date(year, month),
        day = (day => day ? day - 1 : 6)( date.getDay()),
        currentDateIndex = currentDate.getDate(),
        daysCount = ( new Date(year, month + 1, 0)).getDate(),
        pastDaysCount = ( new Date(year, month, 0)).getDate(),
        pastMonthCounterValue = pastDaysCount - day;

    console.log(this.date, this._months[month], month);

    this.datesElement.style.counterReset = `past-month ${pastMonthCounterValue} current-month 0 next-month  0`;
    this.monthElement.textContent = this._months[month];
    this.yearElement.value = year;

    for (let i = day; i--;) {
        this.daysElements[i].className = 'calendar-ui__date calendar-ui__date_past-month';
    }
    for (let i = day, len = daysCount + day; i < len; i++) {
        this.daysElements[i].className = 'calendar-ui__date calendar-ui__date_current-month';
    }
    for (let i = daysCount + day; i < 42; i++) {
        this.daysElements[i].className = 'calendar-ui__date calendar-ui__date_next-month';
    }

    this.daysElements[currentDateIndex + day - 1].className += ' calendar-ui__date_active';

    const formatDatePart = value => value > 9 ? value : '0' + value;

    this.input.value = `${formatDatePart(currentDateIndex)}.${formatDatePart(month + 1)}.${year}`;
};


let input = document.getElementById('test-date'),
    calendar = document.getElementById('calendar');
new Calendar(calendar, input);
