const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'room'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bid_id: {
    type: DataTypes.INTEGER,
  },
  unread_customer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  unread_designer: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  },
}

const modelOptions = {
  timestamps: false,
  charset: 'utf8',
  tableName: modelName,
  underscored: true,
}

module.exports = (sequelize) => {
  // model 설정
  const model = sequelize.define(modelName, modelAttributes, modelOptions)
  return model
}