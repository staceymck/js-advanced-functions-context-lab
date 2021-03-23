const createEmployeeRecord = function(arr) {
    return {
        firstName:arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

const createEmployeeRecords = function (employeesArray) {
    return employeesArray.map((employee) => {
        return createEmployeeRecord(employee);
    });
};

const createTimeInEvent = function(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this;
};

const createTimeOutEvent = function(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this;
};

const hoursWorkedOnDate = function(date) {
    const inEvent = this.timeInEvents.find((event) => {
        return event.date === date;
    });
    const outEvent = this.timeOutEvents.find((event) => {
        return event.date === date;
    });
    return (outEvent.hour - inEvent.hour)/100;
};

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

const findEmployeeByFirstName = function(employees, firstName) {
   return employees.find(employee => employee.firstName === firstName)
};

const calculatePayroll = function(employees) {
    return employees.reduce((runningTotal, employee) => {
        return runningTotal + allWagesFor.call(employee);
    }, 0);
};
    

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}