// CRUD create read update delete
// C - Create -> Insert data into the document

const express = require('express') //  this framework simplifies the server creation process that is already available in Node
const app = express();
const bodyParser = require('body-parser') // Body-parser is a middleware.They help to tidy up the request object before we use them.
const path = require('path')
const mongoose = require('mongoose') // Mongoose is a library that makes MongoDB easier to use. 
const routerUser = require('./routers/routerUser');
const publicDirectoryPath = path.join(__dirname, './views') // Create a path to link a 'views' file and the browser will be able to access all assets in the views directory. 
const url = 'mongodb+srv://eshop:mybecode@cluster0.vhjca.mongodb.net/eshop?retryWrites=true&w=majority'


// Database Connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true, // allows us to quickly access the data & create the indexes in the db
    useUnifiedTopology: true
})

// To check whether the connection has succeeded, we can use the open event. To check whether the connection failed, we use the error event.
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})


// Make sure you place body-parser before your CRUD handlers! - //local server: fetch data from the form + renders the html pages
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routerUser)

app.use(express.static(publicDirectoryPath))


// ------------HANDLERS------
//  app.get - to set up a handler for an HTTP GET request.

app.get('', (req, res) => {
    res.render(publicDirectoryPath)
})

app.get('/register', (req, res) => {
    res.render("register")
})

// to start the server - app.listen is the port you want to listen on browser
app.listen(3000, () => {
    console.log('server is up on port 3000')
})

// Export app 
module.exports = app;