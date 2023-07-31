const path = require('path');
const {check} = require('express-validator');
const userController = require('../controller/usersController.js'); 
const productsController = require('../controller/productsController.js'); 


const routes = (app) => {

  app.get('/products', productsController.productsView);
  app.get('/users', userController.usersView);
  app.get('/home', userController.homeView);
  app.get('/', userController.signUpView);
  app.get('/detail-product',  userController.detailProduct);
  app.get('/register', userController.register);
  app.get('/loginView', userController.loginView);
  app.get('/cart', userController.cart);
  app.get('/signUp', userController.signUpView);
  app.post('/signup',[
                      check('name').isLength({min : 5}),
                      check('name').isAlpha().withMessage('Must be alphabetical characters'),
                     ] ,userController.signUp);
app.post('/login', userController.login);
app.get('/logout', userController.logout);

}

module.exports = {
  routes,
}