const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/mongoModels/user')
module.exports = (router) => {
    router.post("/loginUser", async(req, res) => {
        let {name,password} = req.body

        try  {
            let authUser = await User.findOne({name})

            if (!authUser) {
                return res.status(400).json({
                    Status: 400,
                    Message: "Wrong User and password combination!"
                })
            }

            let isMatch = bcrypt.compare(password, authUser.password)

            if (!isMatch) {
                return res.status(400).json({
                    Status: 400,
                    Message: "Wrong User and password combination!"
                })
            }
            let payload = {
                user: {
                    id: authUser.id
                }
            }
            jwt.sign(
                payload,
                "finfleet",
                (err, token) => {
                    if (err) throw err
                    res.status(200).json({
                        Status: 200,
                        token,
                        User_data: {
                            id: authUser.id
                        }
                    })
                }
            )
        } catch (e) {
            console.error(e)
            res.status(500).json({
                Status: 500,
                Message: "Server error!"
            })
        }
    })
}
