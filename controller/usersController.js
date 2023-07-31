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

const detailProduct = (req, res) => {
  res.render(path.join(__dirname, '../views/detail-product.ejs'))
}

const cart = (req, res) => {
  res.render(path.join(__dirname, '../views/cart.ejs'))
}

const login = (req, res) => {
  
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
        password: req.body.password
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
 
module.exports = {
  homeView,
  detailProduct,
  cart,
  register,
  login,
  loginView,
  signUp,
  signUpView,
  logout,
  usersView,

}

