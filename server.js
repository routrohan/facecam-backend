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
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pass1803',
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
  res.send(database.users);
})

app.post('/signin', (req,res)=> {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res)=> {register.handleRegister(req,res,db, bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
