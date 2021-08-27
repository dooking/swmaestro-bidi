const db = require('./db/bid')
const userDb = require('./db/user')

// Create Bid Resource [create]
exports.createBid = async (params) => {
  const bid = await db.createBid({ ...params })
  return bid
}
exports.createBidStyle = async ({ bidId, stylesIdString }) => {
  if (stylesIdString) {
    const results = await Promise.all(
      stylesIdString.split(',').map((styleId) => {
        return db.createBidStyle(bidId, styleId)
      })
    )
    return results
  } else return null
}

// Read Bid Resource [findOne, findAll]
exports.findAllBidByDesignerId = async (userId) => {
  const bidList = await db.findAllBidByDesignerId(userId)
  return bidList
}
exports.findAllBidByCustomerId = async (userId) => {
  const bidList = await db.findAllBidByCustomerId(userId)
  return bidList
}
exports.findOneBid = async (id) => {
  const bid = await db.findOneBid(id)
  return bid
}

// Update Bid Resource [update]
exports.updateBid = async (params) => {
  const bid = await db.updateBid({ ...params })
  return bid
}
exports.updateBidCanceled = async (id, body) => {
  const { canceled } = body
  const bid = await db.updateBidCanceled(id, body)
  return bid
}

// Delete Bid Resoure [destroy]
exports.destroyBid = async (id) => {
  const bid = await db.destroyBid(id)
  return bid
}
