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

  const detailProduct = async (req, res, next) => {
    try {
  const product = await Products.findOne({where: {id: req.params.id}}); 
  if (!product) {
  res.status(404).render('error', {
      title: 'Página no encontrada',
      subtitle: 'Página no encontrada',
      errorNumber: '404'
  })
  return
  }
  res.render(path.join(__dirname,'../views/detail-product.ejs'))

}catch (error) {
  console.error('Error al obtener productos:', error);
  res.status(500).send('Error al obtener productos');
}

}

  
 
module.exports = {
  productsView,
  detailProduct,
}

