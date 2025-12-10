import { DataTypes } from 'sequelize'
import { database } from '../database.js'
import Usuario from './Usuario.js'

const Chamado = database.define('chamados', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  prioridade: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('aberto', 'em_andamento', 'concluido'),
    allowNull: false,
    defaultValue: 'aberto'
  },
  criado_em: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  atualizado_em: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
})

Usuario.hasMany(Chamado, { foreignKey: 'usuarioId' })
Chamado.belongsTo(Usuario, { foreignKey: 'usuarioId' })

export default Chamado
