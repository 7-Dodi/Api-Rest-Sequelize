const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Usuario = sequelize.define('Usuario',{
    email:{
      type: DataTypes.STRING,
      primaryKey: true
    },
    nome:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },{}
  );
  
async function sincronizar(){
  await Usuario.sync();
  console.log('SIncronizado');
}
  
sincronizar();

module.exports = Usuario;