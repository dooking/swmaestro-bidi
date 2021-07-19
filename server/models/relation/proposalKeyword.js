const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const modelName = 'proposalKeyword'

const modelAttributes = {
  proposal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  keyword_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  }
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
  // 외래키 설정
  //   model.associate = (db) => {
  //     model.belongsTo(db.user, { foreignKey: 'uid', targetKey: 'uid' })
  //     model.belongsTo(db.payment, { foreignKey: 'pid', targetKey: 'pid' })
  //   }
  return model
}
