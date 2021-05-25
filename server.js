const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize=require('./config/connection');
const SequelizeStore=require('connect-session-sequelize')(session.Store);

const app= express();
const PORT=process.env.PORT || 3001;

//use handlebars
const hbs = exphbs.create({ helpers });
//END use handlebars

//use session
const sess = {
    secret: 'My secret secret', //pick whatver string you want
    cookie: {},
    resave: false,
    saveUninitialized:true,  //LEARN what this does
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//use template engine with Express
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//set Express settings
app.use(express.json()); //LEARN
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//once sequelize syncs, begin listening on port 3001 for changes
sequelize.sync({force:false}).then(() => {app.listen(PORT, () => console.log('http://localhost/' + PORT))
});
