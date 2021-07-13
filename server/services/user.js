const db = require('./db/user')

exports.getUser = async (userId) => {
  const user = await db.selectUser(userId)
  return user
}

exports.getUsers = async () => {
  const user = await db.selectAllUser()
  return user
}

exports.registerUser = async (params) => {
  const user = await db.insertUser({ ...params })
  return user
}
