const fs = require('fs');
const path = require('path');
const  User = require('../models').user;
const bcrypt = require('bcrypt');


const getUsers = async () => {
  try {
    const usuarios = await User.findAll();
    return usuarios;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

const writeUser  = async (userData) => {
  try {
    const newUser = {
      email: userData.email,
      name: userData.name,
      password: bcrypt.hashSync(userData.password, 10),
      lastname: userData.lastname,
      domicilio: userData.domicilio,
      numcel: userData.numcel
    }
return await User.create(newUser)
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


const delUsers = async (userId) => {
  try {
    await User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
}

module.exports = {
    getUsers,
    writeUser,
    delUsers
}