/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = function(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeesArray) {
    return employeesArray.map((employee) => createEmployeeRecord(employee));
}

const createTimeInEvent = function(dateStamp) {
    let [date, time] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date
    });

    return this;
}

const createTimeOutEvent = function(dateStamp) {
    let [date, time] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date
    });

    return this;
}

const hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find((event) => event.date === date);
    let timeOut = this.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find((employeeRecord) => employeeRecord.firstName === firstName);
}

let calculatePayroll = function(employeeRecordsArray) {
    return employeeRecordsArray.reduce((acc, employeeRecord) => acc + allWagesFor.call(employeeRecord), 0);
}

