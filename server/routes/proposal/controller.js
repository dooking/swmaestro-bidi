const proposalServices = require('../../services/proposal')
const { STATUS_CODE, ERROR_MESSAGE } = require('../../lib/constants')

// [ 1. POST Methods ]
exports.registerProposal = async (req, res, next) => {
  try {
    const body = req.body
    const proposal = await proposalServices.createProposal(body)
    if (proposal) {
      res.status(STATUS_CODE.CREATED).json({
        message: '제안서 등록 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: '제안서 등록 실패',
        data: proposal,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.registerWithFile = async (req, res, next) => {
  try {
    const { location } = req.file
    const body = {
      ...req.body,
      after_src: location,
    }
    const proposal = await proposalServices.createProposal(body)
    if (proposal) {
      res.status(STATUS_CODE.CREATED).json({
        message: '제안서 등록 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '제안서 등록 실패',
        data: proposal,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 2. GET Methods ]
exports.getProposalList = async (req, res, next) => {
  try {
    const proposalList = await proposalServices.findAllProposal()
    if (proposalList && proposalList.length > 0) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '전체 제안서 목록 조회 성공',
        data: proposalList,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '전체 제안서 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    const proposal = await proposalServices.findOneProposal(id)
    if (proposal) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '제안서 정보 조회 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '제안서 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
exports.getProposalByUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const proposal = await proposalServices.findOneProposalByUserId(id)
    if (proposal) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '유저의 제안서 정보 조회 성공',
        data: proposal,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: '유저의 제안서 정보 조회 실패',
        data: null,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 3. PATCH Methods ]
exports.patchProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const patchedProposalCount = await proposalServices.updateProposal(id, body)
    if (patchedProposalCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '제안서 상태 정보 수정 성공',
        data: patchedProposalCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '제안서 상태 정보 수정 실패(No resources or No change)',
        data: patchedProposalCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}

// [ 4. DELETE Methods]
exports.deleteProposal = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProposalCount = await proposalServices.destroyProposal(id)
    if (deletedProposalCount) {
      res.status(STATUS_CODE.SUCCESS).json({
        message: '제안서 정보 삭제 성공',
        data: deletedProposalCount,
      })
    } else {
      res.status(STATUS_CODE.NOT_FOUND).json({
        // 에러는 없으나, 수정된 정보가 없습니다!
        message: '제안서 정보 삭제 실패(No resources)',
        data: deletedProposalCount,
      })
    }
  } catch (err) {
    console.error(ERROR_MESSAGE.ROUTES_ERROR)
    console.error(err)
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGE.SERVER_ERROR })
  }
}
