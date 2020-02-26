const user = require('../../models/mongoModels/user')
module.exports = (router) => {
    router.post('/event/create', require('../middlewares/verifyServerToken'), async (req, res) => {
        idUser = req.user
        console.log(idUser);
        
        try {
            //let checkUser = await user.findById(idUser.id)
            //console.log(checkUser);
            

        }
        catch (err) {
            console.log(err);

        }
    })
}

