const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: 'views/layouts',
        defaultLayout: 'main'
    }))
    
    app.set('view engine', 'hbs')

    app.use(express.static('./content'))
    app.use(bodyParser.urlencoded({ extended: true }))
}
