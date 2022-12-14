const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'matchingHistory'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bid_id: {
    type: DataTypes.INTEGER,
  },
  customer_id: {
    type: DataTypes.INTEGER,
  },
  designer_id: {
    type: DataTypes.INTEGER,
  },
  proposal_id: {
    type: DataTypes.INTEGER,
  },
  review: {
    type: DataTypes.STRING,
  },
  star: {
    type: DataTypes.FLOAT,
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
