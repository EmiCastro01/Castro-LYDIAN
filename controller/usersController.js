const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const usersFilePath = path.join(__dirname, '../data/users.json');
const Users = require('../models').user;




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
  const users = getUsers();
  const userToCompare =  {...req.body}
  const user = users.find(user => user.email == userToCompare.email);
    if(user && user.email === userToCompare.email && bcrypt.compareSync(userToCompare.password, user.password)){
      req.session.nombre = user.name
      res.redirect('/home')
    } else {
      res.send("Usuario Invalido")
    }
}

const loginView = (req, res) => {
  res.render(path.join(__dirname, '../views/login.ejs'))
}

const register = (req, res) => {
res.render(path.join(__dirname, '../views/register.ejs'))
}

const signUp = (req, res) => { 
  const errors = validationResult(req)          // Validar los checks y enviar un res con el status de los errores.
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  const users = getUsers()
  const newUser = {
    id: users.length + 1,
    ...req.body
  }
  newUser.password = bcrypt.hashSync(newUser.password, 10)
  users.push(newUser)
  const newDataBase = '{ "usuarios": ' + JSON.stringify(users, null, 2) + '}'
  fs.writeFileSync(usersFilePath, newDataBase)
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

