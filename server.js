const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const User 			     = require('./models/users.js')
const bcrypt 		     = require('bcryptjs')
const multer         = require('multer');
require('dotenv').config()
// console.log(process.env);

require('./db/db')

const PORT = process.env.PORT
const userController  = require('./controllers/userController');
const projectController = require('./controllers/projectController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false 
}))

app.use('/users', userController);
app.use('/projects', projectController);



app.get('/', (req, res) => {
		res.render('home.ejs', {
			message: req.session.message
		})
})

app.get('/about', (req, res) => {
    res.render('about.ejs', {
      message: req.session.message
    })
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs', {
      message: req.session.message
    })
})

app.post('/login', async (req, res, next) => {

  try {
    const foundUser = await User.findOne({userName: req.body.userName});
    // console.log(foundUser);
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
        req.session.message = '';
        req.session.logged = true;
        req.session.usersDbId = foundUser._id;
        console.log(req.session.usersDbId + '<========= Session userDbId');
        // console.log(req.session, ' successful in login')
        res.redirect(`/users/${foundUser._id}`);
      } else {
        req.session.message = "Username or password is incorrect";
        res.redirect('/');
      }
    } else {
      req.session.message = 'Username or Password is incorrect';
      res.redirect('/');
    }
  } catch(err){
    next(err);
  }	
})


app.listen(PORT, () => {
  // console.log(`listening... on port: ${PORT}`);
});

