const user = require('../../models/mongoModels/user')
const event = require('../../models/mongoModels/event')
const method = require('../middlewares/methodMiddle')


module.exports = (router) => {
    router.post('/event/delete', require('../middlewares/verifyServerToken'), async (req, res) => {
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
                let eventQuery = await event.findOneAndDelete({id:dataBody._id})
                res.status(200).json({
                    Message:'Delete event: '+eventQuery.event_name,
                })
            }
            
        }
        catch (err) {
            console.log(err);

        }
    })
}

