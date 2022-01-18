/* Your Code Here */
const createEmployeeRecord = (recArr) => {
    return {
        firstName: recArr[0],
        familyName: recArr[1],
        title: recArr[2],
        payPerHour: recArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (empArr) => {
    return empArr.map(recArr => createEmployeeRecord(recArr))
}

const createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    }
    this.timeInEvents.push(timeInEvent)
    return this
}

const createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let timeOutEvent = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

const hoursWorkedOnDate = function (date) {
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === date)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === date)
    return ((outEvent.hour - inEvent.hour) / 100)
}

const wagesEarnedOnDate = function (date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
}

const findEmployeeByFirstName = function (empArr, firstName) {
    return empArr.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function (recsArr) {
    return recsArr.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}


/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

