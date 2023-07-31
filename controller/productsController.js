const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const Products = require('../models').producto;

  const productsView = (req,res,next) => {
    return  Products.findAll()
    .then( Products => {  
                  if( Products ) {res.render(path.join(__dirname, '../views/products.ejs'), { Products })}
                  else {
                         const err = {}
                        err.status = 404
                        err.messages = [ { msg: "No hay productos" } ]
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


 
module.exports = {
  productsView,

}

