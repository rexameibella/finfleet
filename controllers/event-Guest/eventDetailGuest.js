const user = require('../../models/mongoModels/user')
const event = require('../../models/mongoModels/event')
const category = require('../../models/mongoModels/category')
const talent = require('../../models/mongoModels/talent')
const method = require('../middlewares/methodMiddle')
const team = require('../../models/mongoModels/team')


module.exports = (router) => {
    router.post('/eventGuest/detail', require('../middlewares/verifyServerToken'), async (req, res) => {
        let event_id = req.body._id
        let idUser = req.user
        if (idUser == 0) {
            idUser = { id: null }
        }

        try {
            let attribute = new Array
            let checkUser = await user.findById(idUser.id)
            let queryEvent = await event.findById(event_id)

            if (!checkUser) {
                let eventNoAuth = await noAuthDetail(queryEvent)
                attribute = eventNoAuth

            }
            //CHECK USER AUTH
            else {
                if (checkUser.role != 1) {
                    res.status(401).json({
                        data: {
                            Message: "Invalid User"
                        }
                    })
                }
                else {
                    checkUser = method.method.jsonParse(checkUser)

                    if (queryEvent.joined == null) {
                        let eventAuthEmpty = await authDetailEmpty(queryEvent)
                        attribute = eventAuthEmpty
                    }
                    else {
                        if (queryEvent.isTeam == true) { //CHECK BY TEAM user_id,
                            let eventAuthTeam = await authDetailTeam(queryEvent, checkUser[0].user_id)
                            attribute = eventAuthTeam
                        }
                        else if (queryEvent.isTeam == false) { //CHECK BY USER ID
                            let eventAuthNoTeam = await authDetailNoTeam(queryEvent, checkUser[0].id)
                            attribute = eventAuthNoTeam

                        }
                    }


                }
            }
            res.status(200).json({
                data: {
                    type: 'Event',
                    attribute
                }

            })

        }
        catch (err) {
            console.log(err);

        }
    })
}


async function noAuthDetail(queryEvent) {
    let attribute = new Array
    let queryTalent = await talent.findById(queryEvent.bakat_id)
    let queryCategory = await category.findById(queryEvent.category_id)
    let startDate = method.method.dateFormat(queryEvent.date_start)
    let endDate = method.method.dateFormat(queryEvent.date_end)
    let date_lastCall = method.method.dateFormat(queryEvent.date_lastCall)

    attribute.push({
        event_name: queryEvent.event_name,
        icon_talent: queryTalent.icon,
        icon_category: queryCategory.icon,
        event_description: queryEvent.event_description,
        rule: queryEvent.rule,
        date_start: startDate,
        date_end: endDate,
        date_lastCall: date_lastCall,
        first_place: queryEvent.first_place,
        second_place: queryEvent.second_place,
        third_place: queryEvent.third_place,
        jumlah_join: queryEvent.jumlah_join,
        max_participant: queryEvent.max_participant,
        login: false,
        join_status: false
    })
    return attribute

}

async function authDetailEmpty(queryEvent) {
    let attribute = new Array
    let queryTalent = await talent.findById(queryEvent.bakat_id)
    let queryCategory = await category.findById(queryEvent.category_id)
    let startDate = method.method.dateFormat(queryEvent.date_start)
    let endDate = method.method.dateFormat(queryEvent.date_end)
    let date_lastCall = method.method.dateFormat(queryEvent.date_lastCall)

    attribute.push({
        event_name: queryEvent.event_name,
        icon_talent: queryTalent.icon,
        icon_category: queryCategory.icon,
        event_description: queryEvent.event_description,
        rule: queryEvent.rule,
        date_start: startDate,
        date_end: endDate,
        date_lastCall: date_lastCall,
        first_place: queryEvent.first_place,
        second_place: queryEvent.second_place,
        third_place: queryEvent.third_place,
        jumlah_join: queryEvent.jumlah_join,
        max_participant: queryEvent.max_participant,
        login: true,
        join_status: false
    })
    return attribute
}

async function authDetailNoTeam(queryEvent, userId) {
    let joined = queryEvent.joined
    let attribute = new Array
    let queryTalent = await talent.findById(queryEvent.bakat_id)
    let queryCategory = await category.findById(queryEvent.category_id)
    let startDate = method.method.dateFormat(queryEvent.date_start)
    let endDate = method.method.dateFormat(queryEvent.date_end)
    let date_lastCall = method.method.dateFormat(queryEvent.date_lastCall)

    for (let i = 0; i < joined.length; i++) {
        if (joined[i] == userId) {
            joined[i] = 1
        }
        else {
            joined[i] = 0
        }
    }
    if (1 in joined) { //CHECK VALUE:1 IN ARRAY JOINED
        attribute.push({
            event_name: queryEvent.event_name,
            icon_talent: queryTalent.icon,
            icon_category: queryCategory.icon,
            event_description: queryEvent.event_description,
            rule: queryEvent.rule,
            date_start: startDate,
            date_end: endDate,
            date_lastCall: date_lastCall,
            first_place: queryEvent.first_place,
            second_place: queryEvent.second_place,
            third_place: queryEvent.third_place,
            jumlah_join: queryEvent.jumlah_join,
            max_participant: queryEvent.max_participant,
            login: true,
            join_status: true
        })

    }
    else {
        attribute.push({
            event_name: queryEvent.event_name,
            icon_talent: queryTalent.icon,
            icon_category: queryCategory.icon,
            event_description: queryEvent.event_description,
            rule: queryEvent.rule,
            date_start: startDate,
            date_end: endDate,
            date_lastCall: date_lastCall,
            first_place: queryEvent.first_place,
            second_place: queryEvent.second_place,
            third_place: queryEvent.third_place,
            jumlah_join: queryEvent.jumlah_join,
            max_participant: queryEvent.max_participant,
            login: true,
            join_status: false
        })
    }
    return attribute
}

async function authDetailTeam(queryEvent, user_id) {
    let checker = new Array
    let teamUserId = new Array
    let joinedEvent = queryEvent.joined
    let query = await team.find({ member: { $elemMatch: { user_id: user_id, status: true } } })
    let attribute = new Array
    let queryTalent = await talent.findById(queryEvent.bakat_id)
    let queryCategory = await category.findById(queryEvent.category_id)
    let startDate = method.method.dateFormat(queryEvent.date_start)
    let endDate = method.method.dateFormat(queryEvent.date_end)
    let date_lastCall = method.method.dateFormat(queryEvent.date_lastCall)
    for (let i = 0; i < query.length; i++) {
        teamUserId.push(query[i]._id)
    }
    for (let i = 0; i < joinedEvent.length; i++) {
        for (let j = 0; j < teamUserId.length; j++) {
            if (joinedEvent[i] == teamUserId[j]) {
                checker.push(1)
            }
            else {
                checker.push(0)
            }
        }
    }
    if (1 in checker) {
        attribute.push({
            event_name: queryEvent.event_name,
            icon_talent: queryTalent.icon,
            icon_category: queryCategory.icon,
            event_description: queryEvent.event_description,
            rule: queryEvent.rule,
            date_start: startDate,
            date_end: endDate,
            date_lastCall: date_lastCall,
            first_place: queryEvent.first_place,
            second_place: queryEvent.second_place,
            third_place: queryEvent.third_place,
            jumlah_join: queryEvent.jumlah_join,
            max_participant: queryEvent.max_participant,
            login: true,
            join_status: true
        })
    }
    else {
        attribute.push({
            event_name: queryEvent.event_name,
            icon_talent: queryTalent.icon,
            icon_category: queryCategory.icon,
            event_description: queryEvent.event_description,
            rule: queryEvent.rule,
            date_start: startDate,
            date_end: endDate,
            date_lastCall: date_lastCall,
            first_place: queryEvent.first_place,
            second_place: queryEvent.second_place,
            third_place: queryEvent.third_place,
            jumlah_join: queryEvent.jumlah_join,
            max_participant: queryEvent.max_participant,
            login: true,
            join_status: false
        })
    }
    return attribute
}