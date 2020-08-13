const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controller/register')
const signin = require('./controller/signin.js')
const profile = require('./controller/profile')
const image = require('./controller/image')

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-shallow-90277',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});
db.select('*').from('users').then(data=> {
  console.log(data)
})
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send("backend works");
})

app.post('/signin', (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res)=> {register.handleRegister(req,res,db, bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log('app is running on port 3000');
})
