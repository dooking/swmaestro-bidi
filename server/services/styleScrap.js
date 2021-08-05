const db = require('./db/styleScrap')

const registerStyleScrap = async (params) => {
  const styleScrap = await db.insertStyleScrap({ ...params })
  return styleScrap
}

const deleteStyleScrap = async (params) => {
  const styleScrap = await db.destroyStyleScrap({ ...params })
  return styleScrap
}

const getStyleScrapList = async (userId) => {
  let styleScrapList = []

  const userStyleScrapList = await db.selectStyleScrapByUser(userId)

  for (const styleScrap of userStyleScrapList.styleScraps) {
    const tmpScrap = makeStyleScrapData(styleScrap.dataValues)
    styleScrapList.push(tmpScrap)
  }
  return styleScrapList
}

const makeStyleScrapData = (styleScrap) => {
  const {
    id,
    title,
    subtitle,
    price,
    gender,
    img_src_one,
    img_src_two,
    img_src_three,
  } = styleScrap
  return {
    id,
    title,
    subtitle,
    price,
    gender,
    img_src_one,
    img_src_two,
    img_src_three,
  }
}

module.exports = { registerStyleScrap, deleteStyleScrap, getStyleScrapList }
