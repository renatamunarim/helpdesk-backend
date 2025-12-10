import { DataTypes } from 'sequelize'
import { database } from '../database.js'


const Usuario = database.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  perfil: {
    type: DataTypes.ENUM('usuario', 'tecnico'),
    defaultValue: 'usuario'
  }
})

export default Usuario