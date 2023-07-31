const fs = require('fs');
const path = require('path');
const  Product = require('../models').producto;

const getProducts = async () => {
  try {
    const products = await Product.findAll()
    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}


module.exports = {
    getProducts,

}