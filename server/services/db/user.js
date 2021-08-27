const { User } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

// Create User Resource [create]
exports.createUser = async (attr) => {
  try {
    const user = await User.create({
      raw: true,
      ...attr,
      authentication: false,
      ai_status: false,
      ai_process: false,
      ai_count: 0,
    })
    return user
  } catch (err) {
    console.error(ERROR_MESSAGE.SEQUELIZE_CREATE_ERROR)
    console.error(err)
    return null
  }
}

// Read User Resource [selectOne, selectAll]
exports.findOneUser = async (userId) =>
  await User.findOne({
    raw: true,
    where: {
      id: userId,
    },
  })
    .then((results) => {
      return results
    })
    .catch((err) => {
      console.error('Sequelize: Failed Selecting User')
      throw err
    })

exports.findOneUserByToken = async (token) => {
  const results = await User.findOne({
    raw: true,
    where: {
      [or]: [
        { naver_token: token },
        { kakao_token: token },
        { apple_token: token },
      ],
    },
  })
  return results
}

exports.findAllUser = async () => {
  const results = await User.findAll({
    raw: true,
  })
  return results
}

exports.findLastUser = async () => {
  const results = await User.findOne({
    raw: true,
    limit: 1,
    order: [['id', 'DESC']],
  })
  return results
}

// Update User Resource [update]
exports.updateUser = async ({
  id,
  user_type,
  naver_token,
  kakao_token,
  apple_token,
  name,
  nick_name,
  phone_number,
  birth,
  gender_type,
  img_src,
  authentication,
  ai_status,
  ai_process,
  ai_count,
}) => {
  const results = await User.update({
    raw: true,
    user_type,
    naver_token,
    kakao_token,
    apple_token,
    name,
    nick_name,
    phone_number,
    birth,
    gender_type,
    img_src,
    authentication,
    ai_status,
    ai_process,
    ai_count,
    where: {
      id,
    },
  })
  return results
}

exports.updateUserAiStatus = async ({ id, ai_status }) => {
  const results = await User.update(
    {
      ai_status,
    },
    {
      where: {
        id,
      },
    }
  )

  return results
}

// Delete User Resource [destroy]
exports.destroyUser = async (userId) => {
  const results = await User.destroy({
    where: {
      id: userId,
    },
  })

  return results
}
