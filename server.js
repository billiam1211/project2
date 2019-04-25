const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
require('./db/db')


const userController  = require('./controllers/userController');
const projectController = require('./controllers/projectController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'a3jkal12l3!lkj%soin',
  resave: false, 
  saveUninitialized: false 
}))

app.use('/users', userController);
app.use('/users/projects', projectController);










app.listen(3000, () => {
  console.log('listening... on port: ', 3000);
});