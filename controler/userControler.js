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

    },
    logUser: async(req, res) => {
        console.log(req.body)
        try {
            const user = await User.findByCredentials(req.body.userName, req.body.password)
            console.log("Welcome  " + user.userName)
            res.render("index")
        } catch (err) {
            console.log(err)
            res.redirect("/signIn.html")
        }
    }
}


// Export
module.exports = userControler;