const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const flash = require('express-flash');
const handlebars = require('express-handlebars');
const cors = require('cors');
require('dotenv').config();

const init = () => {
    app.use(cors());
    
    app.set('view engine', 'hbs');
    app.engine(
        'hbs',
        handlebars.engine({
            extname: 'hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, '../resources/views/layouts/'),
            partialsDir: path.join(__dirname, '../resources/views/partials/'),
            helpers: {
                formatDate: (date) => {
                    return date.toLocaleDateString('vi-vn');
                },
                equal: function (lval, rval, options) {
                    if (lval == rval) return options.fn(this);
                },
            },
        }),
    );
   

    app.set('views', path.join(__dirname, '../resources/views'));

    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookie('Movie'));
    app.use(session({ cookie: { maxAge: 30000000 } }));
    app.use(flash());
    app.use(bodyParser.urlencoded({ extended: false }));
    return app;

}

module.exports = { init };