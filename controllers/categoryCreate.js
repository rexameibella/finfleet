const category = require('../models/mongoModels/category')
module.exports = (router) => {
    router.post('/category/create', async (req, res) => {
        let dataBody = req.body

        try {
            let pushEvent = await category.insertMany(dataBody)
            res.send(pushEvent)

        }
        catch (err) {
            console.log(err);

        }
    })
}

