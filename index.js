const express = require('express')
const path = require('path')
var exphbs  = require('express-handlebars');
const logger = require('./middleware/logger')
const members = require('./Member')


const app = express()




//Init Member
// app.use(logger)

//Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//HomePage Router
app.get('/', (req, res) => {
    res.render('index',{
        title: 'Member App',
        members
    })
});


//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Members API Routes
app.use('/api/members', require('./routes/api/members'))
// app.use('/api/members', require('./views/layouts/test'))



//server port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server port is${PORT}`))