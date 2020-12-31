const findDaysInAMonth = (givenYear, givenMonth) => {
    let nextMonthDate = new Date(givenYear, givenMonth + 1, 1);
    return new Date(nextMonthDate - 1).getDate();
}

const rangeOfDays = (when, daysInAMonth) => {
    switch (when) {
        case "teenth":
            return [13, 19];
        case "1st":
            return [1, 7];
        case "2nd":
            return [8, 14];
        case "3rd":
            return [15, 21];
        case "4th":
            return [22, 28];
        case "5th":
            return [29, 31];
        case "last":
            return [daysInAMonth - 6, daysInAMonth];
    }
}

const meetupDay = (givenYear, givenMonth, givenDay, when) => {
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let daysInAMonth = findDaysInAMonth(givenYear, givenMonth);

    let [start, end] = rangeOfDays(when, daysInAMonth);

    while (start <= end) {
        let currentDate = new Date(givenYear, givenMonth, start);
        let currentDay = DAYS[currentDate.getDay()];
        if (start > daysInAMonth) {
            throw new Error();
        }
        if (currentDay === givenDay) {
            return currentDate;
        }
        start++;
    }
    throw new Error();
}

module.exports = meetupDay;