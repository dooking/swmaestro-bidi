const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'bid'

const modelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  large_category: {
    type: DataTypes.STRING,
  },
  small_category: {
    type: DataTypes.STRING,
  },
  letter: {
    type: DataTypes.STRING,
  },
  need_care: {
    type: DataTypes.BOOLEAN,
  },
  status: {
    type: DataTypes.STRING,
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
