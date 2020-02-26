const user = require('../../models/mongoModels/user')
const event = require('../../models/mongoModels/event')
const method = require('../middlewares/methodMiddle')


module.exports = (router) => {
    router.post('/event/update', require('../middlewares/verifyServerToken'), async (req, res) => {
        let idUser = req.user
        let dataBody = req.body
        
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
                let eventQuery = await event.findOneAndUpdate({_id:dataBody._id},{$set:dataBody})
                res.status(200).json({
                    Message:'Update event: '+eventQuery.event_name,
                    Update :dataBody
                })
            }
            
        }
        catch (err) {
            console.log(err);

        }
    })
}

