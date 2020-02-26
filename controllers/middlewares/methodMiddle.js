var method = {
    dateFormat: function dateFormat(tanggal) {
        tanggal = Date.parse(tanggal)
        tanggal = new Date(tanggal)
        let startMonth = tanggal.toLocaleString("en", { month: "long" })
        let startDate = tanggal.getDate()
        let startYear = tanggal.getFullYear()
        let startDateBenar = `${startDate}-${startMonth}-${startYear}`;
        return startDateBenar
    },
    dateLastCall: function dateLastCall(startDate) {

        let dateStart = +new Date(startDate)
        let dayLast = 24 * 60 * 60 * 1000
        let date_lastCall = new Date(dateStart-dayLast)
        let date_lastCallFix = new Date(date_lastCall).toISOString()
        return date_lastCallFix
    },
    jsonParse: function jsonParse(object) {
        let newObject = []
        let jsonString = JSON.stringify(object)
        let json = JSON.parse(jsonString)
        newObject.push(json)
        return newObject
    },
}

exports.method = method