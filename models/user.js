//---------------CREATING A MODEL---------------

// In Mongoose, you need to use models to create, read, update, or delete items from a MongoDB collection.
// To create a Model, you need to create a Schema. A Schema lets you** define the structure of an entry** in the collection. This entry is also called a document.
/* You can use 10 different kinds of values in a Schema. Most of the time, you’ll use these six:
String
Number
Boolean
Array
Date
ObjectId */


const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema is used to get more advanced features in the application
const validator = require('validator') // Installed custom validator library for string validators and sanitizers
const bcrypt = require('bcryptjs') //bcryptjs library is used to securely storing password into the database

// Let’s say we want to save some things into the database:
// For registration we need First name, Last name, User name, E-mail, Password
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true, // Built-in validator - required
        trim: true // trim is used to avoid spaces in there name.
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true, // email should be in lowercase letters
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Check with the credentials that the user signin to the application
userSchema.statics.findByCredentials = async(userName, password) => {
    const user = await User.findOne({ userName })
    console.log(user)
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

//method - pre is used to do something before an event/ validation (here bcrypt.hash is used to hash the plain text to hashed psw)
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Once we’ve created characterSchema, we can use mongoose’s model method to create the model.
const User = mongoose.model('user', userSchema)

module.exports = User;