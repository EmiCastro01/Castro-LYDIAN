const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const usersFilePath = path.join(__dirname, '../data/users.json');
const Users = require('../models').user;
const { writeUser, getUsers } = require('../services/userAcces')




const usersView = (req,res,next) => {
  return  Users.findAll()
  .then( Users => {  
                if( Users ) {res.render(path.join(__dirname, '../views/users.ejs'), { Users })}
                else {
                       const err = {}
                      err.status = 404
                      err.messages = [ { msg: "No hay usuarios" } ]
                      return next(err);
                    }
                })
  .catch( error => {
  console.log(error);
                      const err = {}
                      err.status = 404
                      err.messages = [ { msg: error } ]
                      return next(err);
                    })
}

const homeView = (req, res) => {
  res.render(path.join(__dirname, '../views/bienvenidos.ejs'))
}



const cart = (req, res) => {
  res.render(path.join(__dirname, '../views/cart.ejs'))
}

const login = async (req, res) => {
  const {email, password} = req.body;

  try{
      const user = await Users.findOne({ where: { email: email } });
      if (user && bcrypt.compareSync(password, user.password)) {
          res.cookie('username', user.name, {
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true,
            });
        req.session.userId = user.id 
        req.session.us = user.name;
        req.session.showGreeting = true;
        res.redirect('/home');
      } else {
        req.session.showGreeting = false;
       res.render('error')
       
      }

  }catch (error) {
  console.error('Error al iniciar sesión:', error);
  res.status(500).send('Error al iniciar sesión');
}
}



const loginView = (req, res) => {
  res.render(path.join(__dirname, '../views/login.ejs'))
}

const register = (req, res) => {
res.render(path.join(__dirname, '../views/register.ejs'))
}

const signUp = async(req, res, next) => { 
  const errors = validationResult(req)         
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  } else {
    try {
      const lastUser = await Users.findOne({
        order: [['id', 'DESC']]
      })
      let newID = 0
      if(lastUser.id === 0){
        newID = 1;
      }else {newID = lastUser.id ++}

      const userData = {
        id: newID,
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        password: req.body.password,
        domicilio: req.body.domicilio,
        numcel: req.body.numcel,
      }

      await writeUser(userData)

    } catch (error){
      res.status(500).send('Error al agregar usuario'+ error.message);
    }
  }
  res.redirect('/')
}

const signUpView = (req, res) => {
res.render(path.join(__dirname, '../views/signUp.ejs'))
}

const logout = (req, res) => {
  req.session.destroy()
  res.clearCookie('login-session')
  res.redirect('/')
}
 
const errorView = (req,res) =>{
  res.render(path.join(__dirname, '../views/error.ejs'),
  {
      title: 'No Encontrado'
  }
  )
}
module.exports = {
  homeView,
  cart,
  register,
  login,
  loginView,
  signUp,
  signUpView,
  logout,
  usersView,
  errorView
}

