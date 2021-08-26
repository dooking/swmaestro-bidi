const db = require('./db/user')

// Create User Resource [create]
exports.createUser = async (params) => {
  const user = await db.createUser({ ...params })
  if (user) {
    return user
  } else {
    return null
  }
}

// Read User Resource [findOne, findAll]
exports.findOneUser = async (userId) => {
  const user = await db.findOneUser(userId)
  return user
}
exports.findOneUserByToken = async (token) => {
  const user = await db.findOneUserByToken(token)
  return user
}
exports.findAllUser = async () => {
  const user = await db.findAllUser()
  return user
}
exports.findLastUser = async () => {
  const user = await db.findLastUser()
  return user
}

// Update User Resource [update]
exports.updateUser = async (params) => {
  const user = await db.updateUser({ ...params })
  return user
}
exports.updateUserAiStatus = async (params) => {
  const user = await db.updateUserAiStatus({ ...params })
  return user
}

// Delete User Resoure [destroy]
exports.destroyUser = async (userId) => {
  const user = await db.destroyUser(userId)
  return user
}
