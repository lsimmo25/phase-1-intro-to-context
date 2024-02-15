// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {

    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }

}

function createEmployeeRecords(arrayOfArrays) {

    return arrayOfArrays.map(createEmployeeRecord)
}

// dateStamp format YYYY-MM-DD HHMM
function createTimeInEvent(employeeRecord, dateStamp) {
    const date = dateStamp.substring(0, 10)
    const hour = parseInt(dateStamp.substring(11, 15))

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: date,
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const date = dateStamp.substring(0, 10)
    const hour = parseInt(dateStamp.substring(11, 15))

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: date,
    })

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    console.log(employeeRecord)
    const date = dateStamp.substring(0, 10)
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    let timeInHours = parseInt(timeInEvent.hour)
    let timeOutHours = parseInt(timeOutEvent.hour)

    const hoursWorked = (timeOutHours - timeInHours) / 100

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {

    const datesWorked = employeeRecord.timeInEvents.map(e => e.date)

    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return totalWages

}

function calculatePayroll(employeeRecords) {
        return employeeRecords.reduce((totalPayRoll, employeeRecord) => {
            return totalPayRoll + allWagesFor(employeeRecord)
        }, 0)
}