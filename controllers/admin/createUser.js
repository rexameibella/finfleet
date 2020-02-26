const bcrypt = require('bcryptjs')
const User = require('../../models/mongoModels/user')

module.exports = (router) => {
    router.post('/create-user', async(req, res) => {
        try {
            let {name, password} = req.body

            //Check for duplicate username
            let emailMatch = await User.findOne({name})
            if (emailMatch) {
                return res.status(400).json({
                    Status: 400,
                    Message: `This username: ${name} is already in use`
                })
            }

            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)

            let newUser = {
                name:name,
                password: hash
            }
            
            let query = User.insertMany(newUser)
            res.status(200).json({
                User_data: newUser
            })

        } catch (e) {
            console.error(e)
            res.status(500).json({
                Status: 500,
                Message: "Server error!"
            })
        }
    }),

    router.post('/delete-user', async(req, res) => {
        let {id} = req.body
        try {
            await User.deleteOne({_id: id})
            res.status(200).json({
                Message: "Suksess"
            })
        } catch (e) {
            console.error(e)
            res.status(500).json({
                Message: "Gagal"
            })
        }
    })
}