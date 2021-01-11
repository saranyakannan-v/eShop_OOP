const app = require('../app')
const User = require('../models/user')

const userControler = {
    addUsers: async(req, res) => {
        console.log(req.body)
        const user = new User(req.body)
        try {
            await user.save()
            console.log("User saved the data to the database!")
            res.redirect("/")
        } catch (err) {
            console.log(err)
            res.redirect("/")
        }

    }
}


// Export
module.exports = userControler;