const user = require('../../models/mongoModels/user')
const event = require('../../models/mongoModels/event')
const method = require('../middlewares/methodMiddle')


module.exports = (router) => {
    router.get('/event/list/:page', require('../middlewares/verifyServerToken'), async (req, res) => {
        let idUser = req.user
        const resPerPage = 10 // Show List
        const page = req.params.page || 1; // Page


        try {
            let checkUser = await user.findById(idUser.id)
            if (checkUser.role != 2) {
                res.status(401).json({
                    data: {
                        Message: "Invalid User"
                    }
                })
            }
            else {
                let sendData = new Array
                let eventQuery = await event.find({ event_organizer_id: idUser.id })
                    .skip((resPerPage * page) - resPerPage)
                    .limit(resPerPage)
                    .sort({ date_create: -1 })
                let countEvent = await event.find({ event_organizer_id: idUser.id }).countDocuments()
                let countPage = Math.ceil(countEvent / resPerPage)


                for (let i = 0; i < eventQuery.length; i++) {
                    let dateStart = method.method.dateFormat(eventQuery[i].date_start)
                    let dateEnd = method.method.dateFormat(eventQuery[i].date_end)

                    sendData.push({
                        //level_id: eventQuery[i].level_id,
                        bakat_name: eventQuery[i].bakat_name,
                        date_end: dateEnd,
                        date_start: dateStart,
                        event_description: eventQuery[i].event_description,
                        event_model: eventQuery[i].event_model,
                        event_name: eventQuery[i].event_name,
                        max_participant: eventQuery[i].max_participant,
                        jumlah_join: eventQuery[i].jumlah_join,
                        level_name: eventQuery[i].level_name,
                        additional_place: eventQuery[i].additional_place,
                        entry_fee: eventQuery[i].entry_fee,
                        first_place: eventQuery[i].first_place,
                        second_place: eventQuery[i].second_place,
                        third_place: eventQuery[i].third_place,
                        location: eventQuery[i].location,
                    })

                }
                res.status(200).json({sendData, paging: {page : parseInt(page),maxPage : countPage }})
            }
            
        }
        catch (err) {
            console.log(err);

        }
    })
}

