const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (!req.get("Authorization")) {
        return res.status(401).json({
            data: {
                Message: "You're not authorized"
            }

        })
    }
    else {
        let token = req.get("Authorization")
        try {
            let decoded = jwt.verify(token, "finfleet")
            req.user = decoded.user
            next()
        } catch (e) {
            console.error(e)
            res.status(500).json({
                data: {
                    Message: "Invalid token"
                }
            })
        }
    }
}