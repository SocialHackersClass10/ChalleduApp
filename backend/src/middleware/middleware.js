const { User } = require("../Schema")

module.exports = function(req, res, next) {
    const newUser = new User(req.body)
    newUser.validate((err) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        next()
    })

}