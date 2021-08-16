const { Proposal, User } = require('../../models')

exports.selectProposal = async (proposalId) =>
  await Proposal.findOne({
    raw: true,
    where: {
      id: proposalId,
    },
  })
    .then((results) => {
      console.log('Success Selecting Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting Proposal')
      return err
    })

exports.selectProposalByUserId = async (userId) =>
  await Proposal.findAll({
    raw: true,
    where: {
      user_id: userId,
    },
  })
    .then((results) => {
      let cur_proposal = {}
      if (results && results.length > 0) {
        cur_proposal = results.filter((proposal) => proposal.status != 'done')
        console.log('Success Selecting Proposal')
        return cur_proposal[0]
      } else {
        return {}
      }
    })
    .catch((err) => {
      console.log('Failed Selecting Proposal')
      return err
    })

exports.updateProposal = async ({
  id,
  user_id,
  before_src,
  after_src,
  price_limit,
  distance,
  description,
  keywords,
  status,
}) =>
  await Proposal.update(
    {
      raw: true,
      before_src,
      after_src,
      price_limit,
      distance,
      description,
      keywords,
      status,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Proposal')
      return err
    })

exports.destroyProposal = async (proposalId) =>
  await Proposal.destroy({
    where: {
      id: proposalId,
    },
  })
    .then((results) => {
      console.log('Success Destroying Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Destroying Proposal')
      return err
    })

exports.selectAllProposal = async () =>
  await Proposal.findAll({
    include: [
      {
        model: User,
        attributes: ['name', 'img_src', 'address'],
      },
    ],
    where: {
      status: 'wait',
    },
  })
    .then((results) => {
      console.log('Success Selecting All Proposal')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting All Proposal')
      return err
    })

exports.insertProposal = async ({
  user_id,
  before_src,
  after_src,
  price_limit,
  distance_limit,
  keywords,
  description,
  status,
}) =>
  await Proposal.create({
    raw: true,
    userId: user_id,
    before_src,
    after_src,
    price_limit,
    distance_limit,
    keywords,
    description,
    status,
  })
    .then((results) => {
      console.log('Success Creating Proposal')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Creating Proposal')
      return err
    })

exports.selectProposalWithUser = async (userId) => {
  const results = await Proposal.findOne({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'img_src', 'address'],
      },
    ],
  })
  return results
}

exports.updateProposalStatus = async ({ id, status }) =>
  await Proposal.update(
    {
      status,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Proposal Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Proposal Status')
      return err
    })
