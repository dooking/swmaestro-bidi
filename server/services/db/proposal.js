const { Proposal } = require('../../models')
const { Keyword } = require('../../models')

exports.selectProposal = async (proposalId) =>  
  await Proposal.findOne({
    raw: true,
    where: {
      id: proposalId,
    },
  }).then((results) => {
    console.log("Success Selecting Proposal");
    return results
  })
  .catch((err) => {
    console.log("Failed Selecting Proposal");
    return err
  })


exports.selectProposalByUserId = async (userId) =>  
  await Proposal.findOne({
    raw: true,
    where: {
      user_id: userId,
    },
  }).then((results) => {
    console.log("Success Selecting Proposal");
    return results
  })
  .catch((err) => {
    console.log("Failed Selecting Proposal");
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
  status,
}) =>  await Proposal.update({
    raw: true,
    before_src,
    after_src,
    price_limit,
    distance,
    description,
    status
  }, {
    where: {
      id: id
    }
  }).then((results) => {
    console.log("Success Updating Proposal");
    return results
  })
  .catch((err) => {
    console.log("Failed Updating Proposal");
    return err
  })

exports.destroyProposal = async (proposalId) =>  
  await Proposal.destroy({
    where: {
      id: proposalId,
    },
  }).then((results) => {
    console.log("Success Destroying Proposal");
    return results
  })
  .catch((err) => {
    console.log("Failed Destroying Proposal");
    return err
  })

exports.selectAllProposal = async () =>  
  await Proposal.findAll({
    raw: true,
  }).then((results) => {
    console.log("Success Selecting All Proposal");
    return results
  })
  .catch((err) => {
    console.log("Failed Selecting All Proposal");
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
}) => Proposal.create({
    raw: true,
    user_id,
    before_src,
    after_src,
    price_limit,
    distance_limit,
    keywords,
    description,
    status,
  }).then((results) => {
    console.log("Success Creating Proposal");
    return results
  })
  .catch((err) => {
    console.log("Failed Creating Proposal");
    return err
  })